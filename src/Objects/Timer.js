import Settings from '../settings'
import ProgressBar from './ProgressBar'

/* 
    Таймер обратного отсчета 
*/
export default class Timer {
    constructor(scene, x, y) {
        this.scene = scene

        this.initialTime = Settings.countdownTimer.seconds
        this.timeLeft = this.initialTime

        // Прогресс-бар таймера
        this.progressBar = new ProgressBar(this.scene, x, y)

        // Поверх прогресс-бара рисуется текст со счетчиком 
        this.text = this.scene.make.text({
            x,
            y,
            text: this.initialTime,
            style: Settings.countdownTimer.textStyle,
            origin: (0.5, 0.5)
        })
    }

    start() {
        this.reset()
        this.progressBar.start()

        // Обновление текста каждую секунду 
        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.update.bind(this),
            loop: true,
        })
    }

    stop() {
        this.reset()
        this.timer.remove()
        this.progressBar.stop()
    }

    reset() {
        this.timeLeft = this.initialTime
        this.text.setText(this.timeLeft)
    }

    update() {
        this.timeLeft -= 1
        this.text.setText(this.timeLeft)

        // Остановка слот-машины по истечении времени 
        if (this.timeLeft < 0) {
            this.scene.stopMachine()
        }
    }
}