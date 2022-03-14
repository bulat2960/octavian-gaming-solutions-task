import Config from '../config'
import Container from '../Objects/Container'
import Sprite from '../Objects/Sprite'
import Animation from '../Objects/Animation'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')

        this.containers = []
    }

    create() {
        const background = this.add.sprite(Config.width / 2, Config.height / 2, 'background')

        this.startButton = new Sprite(this, Config.width * 0.9,  Config.height * 0.2, 'play').setScale(0.5)
        this.stopButton = new Sprite(this, Config.width * 0.9, Config.height * 0.8, 'stop').setScale(0.5)

        const offset = 150
        const initialWidthOffset = 900
        //const initialHeightOffset = 175
        const initialHeightOffset = 325

        for (let i = 0; i < 5; i++) {
            let container = new Container(this, Config.width - initialWidthOffset + offset * i, Config.height - initialHeightOffset)
            this.containers.push(container)
        }

        //const machine = this.add.sprite(Config.width / 2, Config.height / 2, 'machine')

        this.startButton.on('pointerdown', this.runAnimation, this)
    }

    runAnimation() {
        this.animations = new Animation(this)
    }
}