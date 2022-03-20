import PreloadScene from './Scenes/PreloadScene'
import GameScene from './Scenes/GameScene'
import CircularProgressPlugin from 'phaser3-rex-plugins/plugins/circularprogress-plugin'

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
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [PreloadScene, GameScene],

    plugins: {
        global: [{
            key: 'rexCircularProgressPlugin',
            plugin: CircularProgressPlugin,
            start: true
        },
        ]
    },

    audio: {
        context: audioContext,
    },
}