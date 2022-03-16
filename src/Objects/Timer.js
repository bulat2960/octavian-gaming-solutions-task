import Settings from "../settings"

export default class Timer {
    constructor(scene, x, y, initialTime) {
        this.scene = scene

        this.initialTime = initialTime
        this.timeLeft = initialTime

        let textConfig = {
            x,
            y,
            text: this.formatTime(initialTime),
            style: Settings.textStyle,
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
    }

    stop() {
        this.resetTime()
        this.timer.remove()
    }

    formatTime(seconds) {
        let minutes = Math.floor(seconds / 60)
        let secondsRemainder = seconds % 60
        secondsRemainder = secondsRemainder.toString().padStart(2, '0')

        return `${minutes}:${secondsRemainder}`;
    }

    resetTime() {
        this.timeLeft = this.initialTime
        this.text.setText(this.formatTime(this.timeLeft))
    }

    updateTime() {
        this.timeLeft -= 1
        this.text.setText(this.formatTime(this.timeLeft))

        if (this.timeLeft < 0) {
            this.scene.stopMachine()
        }
    }
}