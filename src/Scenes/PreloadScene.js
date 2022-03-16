import Settings from '../settings'

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload')
    }

    preload() {
        this.load.setPath('../../assets')

        for (let i = 1; i <= Settings.imagesCount; i++) {
            this.load.image('image_' + i, 'images/image_' + i + '.png')
            this.load.image('image_blur_' + i, 'images_blur/image_blur_' + i + '.png')
        }

        this.load.image('play', 'interface/play.png')
        this.load.image('stop', 'interface/stop.png')

        this.load.image('play-grayscale', 'interface/play-grayscale.png')
        this.load.image('stop-grayscale', 'interface/stop-grayscale.png')

        this.load.image('machine', 'interface/machine.png')
        this.load.image('background', 'interface/background.jpg')

        this.load.plugin(
            'rexcircularprogressplugin', 
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcircularprogressplugin.min.js', 
            true
        );  
    }

    create() {
        this.scene.start('Game')
    }
}