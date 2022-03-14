import PreloadScene from './Scenes/PreloadScene'
import GameScene from './Scenes/GameScene'

const audioContext = new (window.AudioContext || window.webkitAudioContext)()

export default {
    type: Phaser.WEBGL,
    background: '#000000',
    parent: 'gameWrapper',
    width: 1200,
    height: 600,
    render: {
        powerPreference: 'high-performance',
        mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
    },
    physics : {
        default : 'arcade',
        arcade : {
            debug : false
        }
    },
    scale: {
        mode: Phaser.Scale.NONE,
    },
    scene: [PreloadScene, GameScene],
    fps : {
        min: 30,
        target: 60
    },
    audio: {
        context: audioContext,
    },
}