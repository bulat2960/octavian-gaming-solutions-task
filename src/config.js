import PreloadScene from './Scenes/PreloadScene'
import GameScene from './Scenes/GameScene'

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
        mode: Phaser.Scale.CENTER_BOTH,
    },
    scene: [PreloadScene, GameScene],
}