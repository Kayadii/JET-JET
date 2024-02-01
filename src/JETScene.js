import Phaser from "phaser";
import Laser from "./Laser";
import Enemy from "./Enemy";

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
    
    // TASK 1: Add Score and Life Text
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
    // TASK 3: Create Enemy Ship Using Enemy Class

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

    // TASK 4: Add Label for Score and Life

    this.physics.add.collider(this.lasers, this.asteroid, this.killAsteroid, null, this)
  }

  update(time) {
    // TASK 5: Add Label for Score and Life Update
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
      frameRate: 12,
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

  // TASK 2: Create Enemy Ship Methods
  // Method to create enemy ship
  createEnemy(){

  }

  // Method to kill enemy ship
  killEnemy(){

  }

}
