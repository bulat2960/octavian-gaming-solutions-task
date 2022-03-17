import Settings from '../settings'

/*
    Прогресс-бар в виде круга
 */
export default class ProgressBar {
    constructor(scene, x, y) {
        this.scene = scene

        this.circularProgress = this.scene.add.rexCircularProgress({
            x,
            y,
            radius: Settings.countdownTimer.radius,

            trackColor: Settings.countdownTimer.trackColor,
            barColor: Settings.countdownTimer.barColor,
            centerColor: Settings.countdownTimer.centerColor,
        })
    }

    start() {
        // Анимация на прогресс-баре
        this.animation = this.scene.tweens.add({
            targets: this.circularProgress,
            value: 1,
            duration: this.millisecondsFromSeconds(Settings.countdownTimer.seconds),
        })

        // Звук в последние 3 секунды
        this.countdownTimer = this.scene.time.addEvent({
            delay: this.millisecondsFromSeconds(Settings.countdownTimer.seconds - 3),
            callback: () => this.scene.audioObject.countdown.play(),
        })
    }

    stop() {
        this.circularProgress.value = 0
        this.animation.remove()
        this.countdownTimer.remove()
        this.scene.audioObject.countdown.stop()
    }

    millisecondsFromSeconds(seconds) {
        return seconds * 1000
    }
}