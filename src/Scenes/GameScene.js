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
        this.startButton.setEnabled(true)
        this.startButton.setCallback(this.runMachine.bind(this))

        this.stopButton = new Button(this, Config.width * controlsWidthMultiplier, Config.height * 0.8, 'stop')
        this.stopButton.setEnabled(false)
        this.stopButton.setCallback(this.stopMachine.bind(this))

        this.timer = new Timer(this, Config.width * controlsWidthMultiplier, Config.height * 0.5, Settings.timerSeconds)

        const containerWidth = 148
        const widthOffset = 300
        const heightOffset = 50

        for (let i = 0; i < Settings.columnsCount; i++) {
            let container = new Container(this, widthOffset + containerWidth * i, heightOffset)
            this.containers.push(container)
        }

        this.add.sprite(Config.width / 2, Config.height / 2, 'machine')
    }

    runMachine() { 
        this.containers.forEach(container => container.startAnimation());
        this.timer.start()

        this.startButton.setEnabled(false)
        this.stopButton.setEnabled(true)
    }

    stopMachine() {
        this.containers.forEach(container => container.stopAnimation());
        this.timer.stop()

        this.stopButton.setEnabled(false)
    }

    calculateStoppedContainers() {
        let stoppedCount = 0

        for (let container of this.containers) {
            stoppedCount += (container.state == container.stateEnum.Stopped) ? 1 : 0
        }

        if (stoppedCount == this.containers.length) {
            this.startButton.setEnabled(true)
        }
    }
}