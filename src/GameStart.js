import Phaser from "phaser";
export default class GameStart extends Phaser.Scene{

    constructor(){
        super('Game-Start')
    }

    init(data){
        this.startButton = undefined
    }

    create(){
        this.add.image(240, 320, "bg").setScale(3.5);
        this.add.image(300, 400, "bg-far-planets");
        this.add.image(100, 200, "bg-planet").setScale(1.5);
        this.add.image(200, 310, "bg-stars").setScale(2);
        this.startButton = this.add.image(240, 400, 'startgame').setInteractive().setScale(0.15)
        this.startButton.once('pointerup', () => {
            this.scene.start('JETScene')
        }, this)

        this.add.text(160, 100, 'JET JET ' , {
            fontSize: '32px', color: 'white' })
    }
}