import Phaser from "phaser";
import Laser from "./Laser";
import Enemy from "./Enemy";
import GameSudahKelar from "./GameSudahKelar";

export default class JETScene extends Phaser.Scene {
  constructor() {
    super("JETScene");
  }

  init() {
    // Player Loadout
    this.player = undefined;
    this.player_engine = undefined;
    this.player_engine_thrust = undefined;
    this.player_weapon = undefined;
    this.lasers = undefined;
    this.laserTime = 40;
    this.score = 0
    this.life = 3

    // Player Movement
    this.speed = 100
    this.cursors = undefined;

    // Asteroid
    this.asteroid = undefined;

    this.enemy = undefined;
    
    this.scoreLabel = undefined;
    this.lifeLabel = undefined;
  }


  create() {
    // ENVIRONMENT
    this.createEnvironment();

    this.cursors = this.input.keyboard.createCursorKeys();
    // PLAYER
    this.createPlayer();

    // LASERS
    this.lasers = this.physics.add.group({
      classType: Laser,
      maxSize: 10,
      runChildUpdate: true
    })

    // ENEMY
    this.enemy = this.physics.add.group({
      classType: Enemy,
      maxSize: 10,
      runChildUpdate: true,
    });

    this.time.addEvent({
      delay: Phaser.Math.Between(1000, 2000),
      callback: this.createEnemy,
      callbackScope: this,
      loop: true,
    });

    //ASTEROID
    this.asteroid = this.physics.add.group({
      classType: Enemy,
      maxSize: 10,
      runChildUpdate: true,
    });

    this.time.addEvent({
      delay: 5000,
      callback: this.createAsteroid,
      callbackScope: this,
      loop: true,
    });

    this.scoreLabel = this.add.text(10, 10, 'score', { 
      fontSize : '16px',
      color : 'black',
      backgroundColor : 'white'
    }).setDepth(1)

    this.lifeLable = this.add.text(10, 30, 'life : 3', { 
      fontSize : '16px',
      color : 'black',
      backgroundColor : 'white'
    }).setDepth(1)

    this.physics.add.overlap(
      this.player,
      this.enemy,
      this.decreaseLife,
      null,
      this
    )

    this.physics.add.overlap(this.lasers, this.asteroid, this.killAsteroid, null, this)
    this.physics.add.overlap(this.lasers, this.enemy, this.killEnemy, null, this)
  }

  update(time) {
    this.scoreLabel.setText('Score : ' + this.score);
    this.lifeLable.setText('life : ' + this.life);
    // PLAYER
    this.movePlayer(this.player, time);
  }

  // Method to create environment
  createEnvironment() {
    // BACKGROUNDS
    this.add.image(240, 320, "bg").setScale(3.5);
    this.add.image(300, 400, "bg-far-planets");
    this.add.image(100, 200, "bg-planet").setScale(1.5);
    this.add.image(200, 310, "bg-stars").setScale(2);
  }

  // Method to create player
  createPlayer(){
    this.player_weapon = this.physics.add.sprite(240, 500, "player-weapon");
    this.player = this.physics.add.sprite(240, 500, "player");
    this.player_engine = this.physics.add.sprite(240, 500, "player-engine");
    this.player_engine_thrust = this.physics.add.sprite(240, 500, "player-engine-thrust");
    
    this.player.setCollideWorldBounds(true);
    this.player_engine.setCollideWorldBounds(true);
    this.player_engine_thrust.setCollideWorldBounds(true);
    this.player_weapon.setCollideWorldBounds(true);
    
    // Animations for Thrust
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player-engine-thrust", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    // Animations for Zapper
    this.anims.create({
      key: "zapper",
      frames: this.anims.generateFrameNumbers("player-weapon", { start: 0, end: 13 }),
      frameRate: 20,
      repeat: -1,
    });
  }

  // Method to move player
  movePlayer(player, time){
    this.player_engine.anims.play("thrust", true);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.speed);
      this.player_engine.setVelocityX(-this.speed);
      this.player_engine_thrust.setVelocityX(-this.speed);
      this.player_weapon.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.speed);
      this.player_engine.setVelocityX(this.speed);
      this.player_engine_thrust.setVelocityX(this.speed);
      this.player_weapon.setVelocityX(this.speed);
    } else {
      this.player.setVelocityX(0);
      this.player_engine.setVelocityX(0);
      this.player_engine_thrust.setVelocityX(0);
      this.player_weapon.setVelocityX(0);
    }

    // If player hit spacebar, play zapper animation
    if (this.cursors.space.isDown) {
      this.player_weapon.anims.play("zapper", true);
      if(time > this.laserTime){
        const laser = this.lasers.get(0, 0, "weapon-ammo");
        if (laser) {
          laser.fire(this.player_weapon.x, this.player_weapon.y);
          this.laserTime = time + 650;
        }
      }
    } else {
      this.player_weapon.anims.stop();
    }
  }

  // Method to create asteroid
  createAsteroid(){
    this.anims.create({
      key: "asteroid",
      frames: this.anims.generateFrameNumbers("asteroid", { start: 0, end: 7 }),
      frameRate: 24,
    });

    const config = {
      speed: 100,
      rotation: 0,
    };
    //@ts-ignore
    const asteroid = this.asteroid.get(0, 0, "asteroid", config);
    const positionX = Phaser.Math.Between(50, 350);
    if (asteroid) {
      asteroid.spawn(positionX);
      // make box smaller
      asteroid.body.setSize(30, 30)
    }
  }

  // Method to killasteroid
  killAsteroid(laser, asteroid){
    laser.die()
    // Play anims until complete then destroy
    asteroid.play("asteroid", true).once("animationcomplete", () => {
      asteroid.die();
      this.score += 10
    });
  }

  // Method to create enemy ship
  createEnemy(){
    this.anims.create({
      key: "enemy",
      frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 7 }),
      frameRate: 24,
    });

    const config = {
      speed: 150,
      rotation: 0,
    };
    //@ts-ignore
    const enemy = this.enemy.get(0, 0, "enemy", config);
    const positionX = Phaser.Math.Between(50, 350);
    if (enemy) {
      enemy.spawn(positionX);
      enemy.setFlipY(true)
      enemy.body.setSize(30, 30)
    }
  }

  // Method to kill enemy ship
  killEnemy(laser, enemy){
    laser.die()
    // Play anims until complete then destroy
    enemy.play("enemy", true).once("animationcomplete", () => {
      enemy.die();
      this.score += 10
    });
  }

  decreaseLife(player,enemy){
    enemy.die()
    this.life--
    if(this.life == 2){
      player.setTint(0xff0000)
    }else if (this.life == 1){
      player.setTint(0xff0000).setAlpha(0.2)
    }else if (this.life == 0){
      this.sound.stopAll()
      // this.sound.play('gameover')
      this.scene.start('over-scene', {score:this.score})
    }
  }
}
