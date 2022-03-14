import Settings from '../settings'

export default class Container extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y)
        this.scene = scene
        scene.add.existing(this)

        for (let i = 0; i < 3; i++) {
            const symbol = scene.add.sprite(0, -Settings.symbolHeight * (i - 1), 'symbol_' + Phaser.Math.Between(1, 11))
            this.add(symbol)
        }
    }
}