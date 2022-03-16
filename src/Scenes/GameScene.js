import Config from '../config'
import Container from '../Objects/Container'
import Button from '../Objects/Button'
import Timer from '../Objects/Timer'
import Settings from '../settings'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')

        this.containers = []
    }

    create() {
        this.add.sprite(Config.width / 2, Config.height / 2, 'background')

        const controlsWidthMultiplier = 0.9

        this.startButton = new Button(this, Config.width * controlsWidthMultiplier, Config.height * 0.2, 'play')
        this.startButton.setCallback(this.runMachine.bind(this))

        this.stopButton = new Button(this, Config.width * controlsWidthMultiplier, Config.height * 0.8, 'stop-grayscale')
        this.stopButton.setCallback(this.stopMachine.bind(this))

        this.timer = new Timer(this, Config.width * controlsWidthMultiplier, Config.height * 0.5, Settings.timerSeconds)

        const containerOffset = 148
        const initialWidthOffset = 900
        const initialHeightOffset = 55

        for (let i = 0; i < Settings.columnsCount; i++) {
            let container = new Container(
                this, 
                Config.width - initialWidthOffset + containerOffset * i, 
                Config.height - initialHeightOffset
            )

            this.containers.push(container)
        }

        this.add.sprite(Config.width / 2, Config.height / 2, 'machine')

        this.resetMachine()
    }

    runMachine() { 
        this.containers.forEach(container => container.startAnimation());
        this.timer.start()

        this.startButton.setTexture('play-grayscale')
        this.startButton.disableInteractive()

        this.stopButton.setTexture('stop')
        this.stopButton.setInteractive()
    }

    stopMachine() {
        this.containers.forEach(container => container.stopAnimation());
        this.timer.stop()

        this.resetMachine()
    }

    resetMachine() {
        this.startButton.setTexture('play')
        this.startButton.setInteractive()

        this.stopButton.setTexture('stop-grayscale')
        this.stopButton.disableInteractive()
    }
}