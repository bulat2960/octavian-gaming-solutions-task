import Settings from '../settings'

export default class Container extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y)
        this.scene = scene
        scene.add.existing(this)

        for (let i = 0; i < Settings.columnsCount; i++) {
            const image = scene.add.sprite(0, -Settings.imageHeight * i, 'image_' + this.getRandomImageNumber())
            this.add(image)
        }

        this.initialDuration = Settings.initialAnimationDuration
        this.currentDuration = this.initialDuration
    }

    startAnimation() {
        this.processAnimationStep()
    }

    stopAnimation() {
        this.currentDuration = this.initialDuration
    }

    processAnimationStep() {
        if (this.currentDuration > Settings.minAnimationDuration) {
            this.currentDuration -= 5
        }

        this.animation = this.scene.tweens.add({
            targets: this,
            props: { 
                y: { 
                    value: "+=" + Settings.imageHeight, 
                    duration: this.currentDuration
                }
            },
            onComplete: this.onComplete.bind(this),
        }, this)
    }

    onComplete() {
        const randomNumber = this.getRandomImageNumber()
        this.animation.updateTo('y', this.y + Settings.imageHeight, true)
        this.first.y = this.last.y - Settings.imageHeight
        this.first.setTexture('image_blur_' + randomNumber)
        this.moveTo(this.first, this.length - 1)

        if (this.scene.isRunning) {
            this.processAnimationStep()
        }

        for (let object of this.list) {
            let imageNumber = this.getImageNumberFromImageName(object.texture.key)
            object.setTexture('image_' + imageNumber)
        }
    }

    getRandomImageNumber() {
        return Phaser.Math.Between(1, Settings.imagesCount)
    }

    getImageNumberFromImageName(imageName) {
        let splittedName = imageName.split('_')
        return splittedName[splittedName.length - 1]
    }
}