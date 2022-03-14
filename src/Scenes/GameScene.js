import Config from '../config'
import Sprite from '../Objects/Sprite'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    create() {
        const background = this.add.sprite(Config.width / 2, Config.height / 2, 'background')
        const machine = this.add.sprite(Config.width / 2, Config.height / 2, 'machine')

        this.startButton = new Sprite(this, Config.width * 0.9,  Config.height * 0.2, 'play').setScale(0.5)
        this.stopButton = new Sprite(this, Config.width * 0.9, Config.height * 0.8, 'stop').setScale(0.5)

        this.startButton.on('pointerdown', this.test, this)
    }

    test() {
        console.log("Test")
    }
}