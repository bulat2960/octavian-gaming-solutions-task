import Settings from '../settings'

/*
    Управляюшая кнопка слот-машины
*/
export default class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, enabled, callback) {
        super(scene, x, y, texture)

        scene.add.existing(this)

        const {initial, clicked} = Settings.controlButtonScale

        this.setEnabled(enabled)
        this.setScale(initial)

        this.on('pointerdown', () => {this.setScale(clicked)}, this)
            .on('pointerout', () => {this.setScale(initial)}, this)
            .on('pointerup', () => {
                this.setScale(initial)
                this.scene.audioObject.button.play()
                callback() // При отпускании кнопки мыши сработает callback-функция 
            }, this)
    }

    // Изменение текстуры и статуса интерактивности кнопки
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