import Settings from '../settings'
import ProgressBar from './ProgressBar'

export default class Timer {
    constructor(scene, x, y, initialTime) {
        this.scene = scene

        this.initialTime = initialTime
        this.timeLeft = initialTime

        this.progressBar = new ProgressBar(this.scene, x, y, initialTime)

        let textConfig = {
            x,
            y,
            text: initialTime,
            style: Settings.textStyle,
            origin: (0.5, 0.5)
        }
        this.text = this.scene.make.text(textConfig)
    }

    start() {
        this.resetTime()
        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.updateTime.bind(this),
            loop: true,
        })
        this.progressBar.start()
    }

    stop() {
        this.resetTime()
        this.timer.remove()
        this.progressBar.stop()
    }

    resetTime() {
        this.timeLeft = this.initialTime
        this.text.setText(this.timeLeft)
    }

    updateTime() {
        this.timeLeft -= 1
        this.text.setText(this.timeLeft)

        if (this.timeLeft < 0) {
            this.scene.stopMachine()
        }
    }
}