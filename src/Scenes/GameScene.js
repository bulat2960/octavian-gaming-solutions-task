import Config from '../config'
import Reel from '../Objects/Reel'
import Button from '../Objects/Button'
import Timer from '../Objects/Timer'
import Settings from '../settings'
import Audio from '../Objects/Audio'

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

        // Управляющие кнопки
        this.startButton = new Button(this, controlsWidth, Config.height * 0.2, 'play', true, this.runMachine.bind(this))
        this.stopButton = new Button(this, controlsWidth, Config.height * 0.8, 'stop', false, this.stopMachine.bind(this))

        // Таймер обратного отсчета 
        this.timer = new Timer(this, controlsWidth, Config.height * 0.5, Settings.countdownTimer.seconds)

        const reelWidth = 148
        const reelWidthOffset = 300
        const reelHeightOffset = 50

        // Барабаны 
        for (let i = 0; i < Settings.reelsCount; i++) {
            this.reels.push(new Reel(this, reelWidthOffset + reelWidth * i, reelHeightOffset))
        }

        // Картинка слот-машины поверх барабанов 
        this.add.sprite(Config.width / 2, Config.height / 2, 'machine')

        // Аудиоконтроллер
        this.audioObject = new Audio(this)
        this.audioObject.background.play()
    }

    // Запуск анимации барабанов, таймера и музыки 
    runMachine() { 
        this.reels.forEach(reel => reel.startAnimation())
        this.timer.start()
        this.audioObject.reel.play()

        this.startButton.setEnabled(false)
        this.stopButton.setEnabled(true)
    }

    // Начало остановки анимации барабанов, сброс таймера 
    stopMachine() {
        this.reels.forEach(reel => reel.stopAnimation())
        this.timer.stop()

        // Деактивируем кнопку stop, но не активируем start, барабаны всё еще вращаются 
        // Кнопка start будет активирована после остановки всех барабанов
        this.stopButton.setEnabled(false)
    }

    calculateStoppedReels() {
        // Подсчет остановленных барабанов
        let stoppedCount = Array.from(this.reels, reel => reel.state == reel.stateEnum.Stopped)
                                .reduce((total, value) => total + Number(value))

        // Активировать кнопку start, если все барабаны остановлены 
        if (stoppedCount == this.reels.length) {
            this.startButton.setEnabled(true)
            this.audioObject.reel.stop()
        }
    }
}