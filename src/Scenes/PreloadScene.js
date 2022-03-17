import Settings from '../settings'

/* 
    Сцена загрузки ресурсов
*/
export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload')
    }

    preload() {
        this.load.setPath('../../assets')

        Array.from(Array(Settings.imagesCount).keys()).forEach(i => {
            this.load.image(`image_${i + 1}`, `images/image_${i + 1}.png`)
            this.load.image(`image_blur_${i + 1}`, `images_blur/image_blur_${i + 1}.png`)
        })

        this.load.image('play', 'interface/play.png')
        this.load.image('stop', 'interface/stop.png')

        this.load.image('play-grayscale', 'interface/play-grayscale.png')
        this.load.image('stop-grayscale', 'interface/stop-grayscale.png')

        this.load.image('machine', 'interface/machine.png')
        this.load.image('background', 'interface/background.jpg')

        this.load.audio('button', 'audio/button.mp3')
        this.load.audio('reel', 'audio/reel.mp3')
        this.load.audio('mall', 'audio/mall.ogg')
        this.load.audio('reel_stop', 'audio/reel_stop.mp3')
        this.load.audio('countdown', 'audio/countdown.wav')
    }

    create() {
        this.scene.start('Game')
    }
}