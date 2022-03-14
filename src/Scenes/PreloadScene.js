import Config from '../config'

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    preload() {
        this.load.setPath('../../assets')

        this.load.image('01_star', 'symbols/01_star.png')
        this.load.image('02_circle', 'symbols/02_circle.png')
        this.load.image('03_triangle', 'symbols/03_triangle.png')
        this.load.image('04_square', 'symbols/04_square.png')
        this.load.image('05_torex', 'symbols/05_torex.png')
        this.load.image('06_hexagon', 'symbols/06_hexagon.png')
        this.load.image('07_a', 'symbols/07_a.png')
        this.load.image('08_k', 'symbols/08_k.png')
        this.load.image('09_q', 'symbols/09_q.png')
        this.load.image('10_j', 'symbols/10_j.png')
        this.load.image('11_ten', 'symbols/11_ten.png')

        this.load.image('play', 'interface/play.png')
        this.load.image('stop', 'interface/stop.png')
    }

    create() {
        this.scene.start('Game');
    }
}