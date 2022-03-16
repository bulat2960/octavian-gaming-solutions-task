import Settings from '../settings'

export default class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)

        this.setScale(Settings.controlButtonsDefaultScale)

        this.on('pointerdown', () => {this.setScale(Settings.controlButtonsClickedScale)}, this)
            .on('pointerout', () => {this.setScale(Settings.controlButtonsDefaultScale)}, this)
    }

    setCallback(callback) {
        this.on('pointerup', () => {
            this.setScale(Settings.controlButtonsDefaultScale)
            callback()
        }, this)
    }
}