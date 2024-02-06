import Phaser from 'phaser'
export default class GameSudahKelar extends Phaser.Scene{
    constructor(){
        super('over-scene')
    }
    init(data){
        this.replayButton = undefined
        this.score = data.score
    }
    
    create(){
        // BACKGROUNDS
        this.add.image(240, 320, "bg").setScale(3.5);
        this.add.image(300, 400, "bg-far-planets");
        this.add.image(100, 200, "bg-planet").setScale(1.5);
        this.add.image(200, 310, "bg-stars").setScale(2);
        this.add.image(240, 200, 'gameover')
        this.add.text(160, 300, 'Score: ' + this.score, {
            fontSize: '32px', color: 'white' })
        this.replayButton = this.add.image(240, 400, 'replay-button').setInteractive().setScale(0.5)
        this.replayButton.once('pointerup', () => {
            this.scene.start('JETScene')
        }, this)
    }
}