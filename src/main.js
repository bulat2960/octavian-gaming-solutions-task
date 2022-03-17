import Phaser from 'phaser'
import Config from './config'

window.startGame = () => {
    new Phaser.Game(Config)
}