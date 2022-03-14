import Phaser from 'phaser'
import Config from './config'

export default class Game {
    constructor() {
        let game = new Phaser.Game(Config)
        game.scale.autoCenter = true
    }
}

window.onload = () => {
    const game = new Game()
}