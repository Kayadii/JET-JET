import Phaser from "phaser";

export default class JETScene extends Phaser.Scene {
  constructor() {
    super("JETScene");
  }

  init() {
    this.player = undefined;
  }

  preload() {
    // Background
    this.load.image("bg", "images/Environment/Background.png");
    this.load.image("bg-planet", "images/Environment/Planet Besar.png");
    this.load.image("bg-stars", "images/Environment/Bintang.png");
    this.load.image("bg-far-planets", "images/Environment/Planet Kecil.png");
    this.load.spritesheet("player", "images/Ship/Ship.png",{
                frameWidth : 48,
                frameHeight : 48
    })
  }

  create() {
    // BACKGROUNDS
    this.add.image(240, 320, "bg").setScale(3.5);
    this.add.image(300, 400, "bg-far-planets");
    this.add.image(100, 200, "bg-planet").setScale(1.5);
    this.add.image(200, 310, "bg-stars").setScale(2);
    this.player = this.physics.add.sprite(240, 557, "player").setScale(1.5);
  }

  update() {

  }
}
