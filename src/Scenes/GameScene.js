import Config from '../config'
import Sprite from '../Objects/Sprite'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.startButton = new Sprite(this, 100, 100, 'play').setScale(0.5)
        this.stopButton = new Sprite(this, 100, 200, 'stop').setScale(0.5)
        
        this.startButton.setInteractive(true)
        this.stopButton.setInteractive(true)

        this.startButton.on('pointerdown', this.test, this)
    }

    test() {
        console.log("Test")
    }
}