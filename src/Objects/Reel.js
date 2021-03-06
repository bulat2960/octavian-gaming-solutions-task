import Settings from '../settings'

/* 
    Барабан слот-машины
*/
export default class Reel extends Phaser.GameObjects.Container {
    constructor(scene, machine, x, y) {
        super(scene, x, y)

        this.machine = machine

        this.scene = scene
        scene.add.existing(this)

        for (let i = 0; i < Settings.reelsCount; i++) {
            const image = scene.add.sprite(0, Settings.imageHeight * i, 'image_' + this.getRandomImageNumber())
            this.add(image)
        }

        this.stateEnum = {
            Stopped: 0,
            Accelerating: 1,
            Decelerating: 2,
        }

        this.reset()
    }

    reset() {
        this.state = this.stateEnum.Stopped
        this.initialDuration = 200 + Phaser.Math.Between(-100, 100)
        this.currentDuration = this.initialDuration
    }

    setAnimationState(state) {
        this.state = state
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

        // Изменение позиции последнего элемента на позицию первого
        this.last.y = this.first.y - Settings.imageHeight
        this.moveTo(this.last, 0)

        // Генерация новой рандомной текстуры для элемента, изменившего позицию
        this.first.setTexture('image_blur_' + this.getRandomImageNumber())

        const {changeStep, minDuration} = Settings.animation

        switch (this.state) {
            case this.stateEnum.Accelerating:
                if (this.currentDuration > minDuration) {
                    // Постепенное уменьшение длительности анимации
                    this.currentDuration -= changeStep
                }
                break
            case this.stateEnum.Decelerating:
                if (this.currentDuration < this.initialDuration) {
                    // Постепенное увеличение длительности анимации
                    this.currentDuration += changeStep
                } else {
                    // Остановка барабана и сброс настроек к стартовым
                    this.reset()
                }
                break
            case this.stateEnum.Stopped:
            default:
                // Возврат текстур из размытых к нормальным
                this.list.forEach(object => object.setTexture('image_' + this.getImageNumberFromImageName(object.texture.key)))

                this.animation.remove()
                this.scene.audioObject.reelStop.play()

                // Вычисление количества остановленных барабанов
                this.machine.onReelStop()

                // Новый шаг анимации не будет запущен 
                return
        }

        this.runAnimationStep()
    }

    getRandomImageNumber() {
        return Phaser.Math.Between(1, Settings.imagesCount)
    }

    // Картинки элементов барабана должны быть представлены в формате image_{number}
    getImageNumberFromImageName(imageName) {
        let splittedName = imageName.split('_')
        return splittedName[splittedName.length - 1]
    }
}