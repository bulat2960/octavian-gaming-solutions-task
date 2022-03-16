import Config from '../config'
import Container from '../Objects/Container'
import Sprite from '../Objects/Sprite'
import Timer from '../Objects/Timer'
import Settings from '../settings'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')

        this.containers = []
        this.isRunning = false
    }

    create() {
        this.add.sprite(Config.width / 2, Config.height / 2, 'background')

        const controlsWidthMultiplier = 0.9

        this.startButton = new Sprite(this, Config.width * controlsWidthMultiplier, Config.height * 0.2, 'play')
        this.startButton.setScale(Settings.controlButtonsDefaultScale)

        this.stopButton = new Sprite(this, Config.width * controlsWidthMultiplier, Config.height * 0.8, 'stop-grayscale')
        this.stopButton.setScale(Settings.controlButtonsDefaultScale)

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

        this.setupControlButton(this.startButton, this.runMachine)
        this.setupControlButton(this.stopButton, this.stopMachine)
    }

    runMachine() {
        if (this.isRunning) {
            return
        }

        this.isRunning = true


        this.containers.forEach(container => container.startAnimation());
        this.timer.start()

        this.startButton.setTexture('play-grayscale')
        this.stopButton.setTexture('stop')

        this.startButton.setScale(Settings.controlButtonsClickedScale)
    }

    stopMachine() {
        if (!this.isRunning) {
            return
        }

        this.isRunning = false

        this.containers.forEach(container => container.stopAnimation());
        this.timer.stop()

        this.startButton.setTexture('play')
        this.stopButton.setTexture('stop-grayscale')

        this.stopButton.setScale(Settings.controlButtonsClickedScale)
    }

    setupControlButton(buttonObject, callback) {
        buttonObject.on('pointerdown', callback, this)
                    .on('pointerup', () => {buttonObject.setScale(Settings.controlButtonsDefaultScale)}, this)
                    .on('pointerout', () => {buttonObject.setScale(Settings.controlButtonsDefaultScale)}, this)
    }
}