import Phaser from 'phaser'
import Config from './config'

export default class Game {
    constructor() {
        new Phaser.Game(Config);
    }
}

window.onload = () => {
    const game = new Game();
}