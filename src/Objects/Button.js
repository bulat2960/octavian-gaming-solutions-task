import Settings from '../settings'

export default class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, enabled, callback) {
        super(scene, x, y, texture)
        scene.add.existing(this)

        this.setEnabled(enabled)
        this.setScale(Settings.controlButtonsDefaultScale)

        this.on('pointerdown', () => {this.setScale(Settings.controlButtonsClickedScale)}, this)
            .on('pointerout', () => {this.setScale(Settings.controlButtonsDefaultScale)}, this)
            .on('pointerup', () => {
                this.setScale(Settings.controlButtonsDefaultScale)
                callback()
            }, this)
    }

    setEnabled(enabled) {
        if (enabled) {
            this.setTexture(this.texture.key.replace('-grayscale', ''))
            this.setInteractive()
        } else {
            this.setTexture(this.texture.key + '-grayscale')
            this.disableInteractive()
        }
    }
}