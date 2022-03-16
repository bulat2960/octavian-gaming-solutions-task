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

        this.stateEnum = {
            Stopped: 0,
            Accelerating: 1,
            Decelerating: 2,
        }

        this.state = this.stateEnum.Stopped

        this.currentDuration = Settings.initialAnimationDuration
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
        // Здесь this.first - это нижний элемент в столбце барабана (соответственно this.last - верхний)
        // То есть 
        this.first.y = this.last.y - Settings.imageHeight
        this.moveTo(this.first, this.length - 1)

        // Генерация новой рандомной текстуры для элемента, изменившего позицию
        const randomNumber = this.getRandomImageNumber()
        this.first.setTexture('image_blur_' + randomNumber)

        if (this.state == this.stateEnum.Accelerating) {
            if (this.currentDuration > Settings.minAnimationDuration) {
                this.currentDuration -= 5
            }
        } else if (this.state == this.stateEnum.Decelerating) {
            if (this.currentDuration < Settings.initialAnimationDuration) {
                this.currentDuration += 5
            } else {
                this.state = this.stateEnum.Stopped
                this.currentDuration = Settings.initialAnimationDuration
            }
        } else if (this.state == this.stateEnum.Stopped) {
            this.animation.remove() 

            for (let object of this.list) {
                let imageNumber = this.getImageNumberFromImageName(object.texture.key)
                object.setTexture('image_' + imageNumber)
            }

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