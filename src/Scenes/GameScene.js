import Config from '../config'
import Button from '../Objects/Button'
import Timer from '../Objects/Timer'
import Settings from '../settings'
import Audio from '../Objects/Audio'
import SlotMachine from '../Objects/SlotMachine'

/*
    Главная сцена игры 
*/
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')

        this.reels = []
    }

    create() {
        this.add.sprite(Config.width / 2, Config.height / 2, 'background')

        // Управляющие кнопки будут отодвинуты на 10% от правой границы экрана 
        const controlsWidthMultiplier = 0.9
        const controlsWidth = Config.width * controlsWidthMultiplier

        this.machine = new SlotMachine(this)

        // Управляющие кнопки
        this.startButton = new Button(this, controlsWidth, Config.height * 0.2, 'play', true, this.runMachine.bind(this))
        this.stopButton = new Button(this, controlsWidth, Config.height * 0.8, 'stop', false, this.stopMachine.bind(this))

        // Таймер обратного отсчета 
        this.timer = new Timer(this, controlsWidth, Config.height * 0.5, Settings.countdownTimer.seconds)

        // Картинка слот-машины поверх барабанов 
        this.add.sprite(Config.width / 2, Config.height / 2, 'machine')

        // Аудиоконтроллер
        this.audioObject = new Audio(this)
        this.audioObject.background.play()
    }

    // Запуск анимации барабанов, таймера и музыки 
    runMachine() { 
        this.machine.run()
        this.timer.start()
        this.audioObject.reel.play()

        this.startButton.setEnabled(false)
        this.stopButton.setEnabled(true)
    }

    // Начало остановки анимации барабанов, сброс таймера 
    stopMachine() {
        this.machine.stop()
        this.timer.stop()

        // Деактивируем кнопку stop, но не активируем start, барабаны всё еще вращаются 
        // Кнопка start будет активирована после остановки всех барабанов
        this.stopButton.setEnabled(false)
    }

    onAllReelsStop() {
        this.startButton.setEnabled(true)

        // Здесь возможна дополнительная логика в полной версии игры,
        // например вычислений выигрышных комбинаций, звуки etc.
    }
}