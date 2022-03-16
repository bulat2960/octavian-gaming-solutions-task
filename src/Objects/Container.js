import Settings from '../settings'

export default class Container extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y)
        this.scene = scene
        scene.add.existing(this)

        for (let i = 0; i < Settings.columnsCount; i++) {
            const image = scene.add.sprite(0, Settings.imageHeight * i, 'image_' + this.getRandomImageNumber())
            this.add(image)
        }

        this.stateEnum = {
            Stopped: 0,
            Accelerating: 1,
            Decelerating: 2,
        }

        this.resetContainer()
    }

    resetContainer() {
        this.state = this.stateEnum.Stopped
        this.initialDuration = 200 + Phaser.Math.Between(-100, 100)
        this.currentDuration = this.initialDuration
    }

    startAnimation() {
        this.state = this.stateEnum.Accelerating
        this.runAnimationStep()
    }

    stopAnimation() {
        this.state = this.stateEnum.Decelerating
    }

    runAnimationStep() {
        // Перемещает контейнер на величину Settings.imageHeight
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
        // Обновление начального и конечного значения для будущего шага анимации 
        this.animation.updateTo('y', this.y + Settings.imageHeight, true)

        // Изменение позиции первого элемента на позицию последнго
        this.last.y = this.first.y - Settings.imageHeight
        this.moveTo(this.last, 0)

        // Генерация новой рандомной текстуры для элемента, изменившего позицию
        this.first.setTexture('image_blur_' + this.getRandomImageNumber())

        if (this.state == this.stateEnum.Accelerating) {    
            if (this.currentDuration > Settings.minAnimationDuration) {
                this.currentDuration -= Settings.animationChangeStep
            }
        } else if (this.state == this.stateEnum.Decelerating) {
            if (this.currentDuration < this.initialDuration) {
                this.currentDuration += Settings.animationChangeStep
            } else {
                this.resetContainer()
            }
        } else if (this.state == this.stateEnum.Stopped) {
            this.animation.remove() 
            this.list.forEach(object => object.setTexture('image_' + this.getImageNumberFromImageName(object.texture.key)))

            this.scene.calculateStoppedContainers()

            return
        }

        this.runAnimationStep()
    }

    getRandomImageNumber() {
        return Phaser.Math.Between(1, Settings.imagesCount)
    }

    getImageNumberFromImageName(imageName) {
        let splittedName = imageName.split('_')
        return splittedName[splittedName.length - 1]
    }
}