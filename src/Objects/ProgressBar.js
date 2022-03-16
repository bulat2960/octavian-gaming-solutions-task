
export default class ProgressBar {
    constructor(scene, x, y, seconds) {
        this.scene = scene
        this.seconds = seconds

        this.circularProgress = this.scene.add.rexCircularProgress({
            x,
            y,
            radius: 50, 

            trackColor: 0x260e04,
            barColor: 0x7b5e57,
            centerColor: 0x4e342e,
        })
    }

    start() {
        this.animation = this.scene.tweens.add({
            targets: this.circularProgress,
            value: 1,
            duration: this.seconds * 1000,
            ease: 'Linear',
        })
    }

    stop() {
        this.circularProgress.value = 0
        this.animation.remove()
    }
}