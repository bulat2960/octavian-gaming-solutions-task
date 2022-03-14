import Config from '../config'

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload')
    }

    preload() {
        this.load.setPath('../../assets')

        this.load.image('symbol_1', 'symbols/01_star.png')
        this.load.image('symbol_2', 'symbols/02_circle.png')
        this.load.image('symbol_3', 'symbols/03_triangle.png')
        this.load.image('symbol_4', 'symbols/04_square.png')
        this.load.image('symbol_5', 'symbols/05_torex.png')
        this.load.image('symbol_6', 'symbols/06_hexagon.png')
        this.load.image('symbol_7', 'symbols/07_a.png')
        this.load.image('symbol_8', 'symbols/08_k.png')
        this.load.image('symbol_9', 'symbols/09_q.png')
        this.load.image('symbol_10', 'symbols/10_j.png')
        this.load.image('symbol_11', 'symbols/11_ten.png')

        this.load.image('symbol_blur_1', 'symbols_blur/01_star_blur.png')
        this.load.image('symbol_blur_2', 'symbols_blur/02_circle_blur.png')
        this.load.image('symbol_blur_3', 'symbols_blur/03_triangle_blur.png')
        this.load.image('symbol_blur_4', 'symbols_blur/04_square_blur.png')
        this.load.image('symbol_blur_5', 'symbols_blur/05_torex_blur.png')
        this.load.image('symbol_blur_6', 'symbols_blur/06_hexagon_blur.png')
        this.load.image('symbol_blur_7', 'symbols_blur/07_a_blur.png')
        this.load.image('symbol_blur_8', 'symbols_blur/08_k_blur.png')
        this.load.image('symbol_blur_9', 'symbols_blur/09_q_blur.png')
        this.load.image('symbol_blur_10', 'symbols_blur/10_j_blur.png')
        this.load.image('symbol_blur_11', 'symbols_blur/11_ten_blur.png')

        this.load.image('play', 'interface/play.png')
        this.load.image('stop', 'interface/stop.png')

        this.load.image('machine', 'interface/machine.png')
        this.load.image('background', 'interface/background.jpg')
    }

    create() {
        this.scene.start('Game')
    }
}