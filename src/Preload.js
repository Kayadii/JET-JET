import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    // Background
    this.load.image("bg", "images/Environment/Background.png");
    this.load.image("bg-planet", "images/Environment/Planet Besar.png");
    this.load.image("bg-stars", "images/Environment/Bintang.png");
    this.load.image("bg-far-planets", "images/Environment/Planet Kecil.png");
    this.load.image('gameover', 'images/gameover.png')
    this.load.image('replay-button', 'images/replay.png')
    this.load.image('startgame', 'images/startgame.png')
    this.load.spritesheet("asteroid", "images/Environment/asteroid.png", {
      frameWidth: 96,
      frameHeight: 96,
    });

    // Player ship loadout
    this.load.spritesheet("player", "images/Ship/Ship.png",{
                frameWidth : 48,
                frameHeight : 48
    })
    this.load.spritesheet("player-engine", "images/Ship/engine.png",{
                frameWidth : 48,
                frameHeight : 48
    })
    this.load.spritesheet("player-engine-thrust", "images/Ship/engine-thrust.png",{
                frameWidth : 48,
                frameHeight : 48
    })
    this.load.spritesheet("player-weapon", "images/Ship/zapper.png",{
                frameWidth : 48,
                frameHeight : 48
    })
    this.load.spritesheet("weapon-ammo", "images/Ship/zapper-ammo.png",{
                frameWidth : 32,
                frameHeight : 32
    })

    // Enemy ship loadout
    this.load.spritesheet("enemy", "images/Enemy/Kla'ed - Scout - Destruction.png",{
                frameWidth : 64,
                frameHeight : 64
    })
    
  }

  create() {
    this.scene.start("Game-Start");
  }
}