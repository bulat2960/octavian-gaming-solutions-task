import Settings from '../settings'
import Reel from './Reel'

/*
    Слот-машина 
*/
export default class SlotMachine {
    constructor(scene) {
        this.scene = scene

        const reelWidth = 148
        const reelWidthOffset = 300
        const reelHeightOffset = 50

        this.reels = []
        Array.from(Array(Settings.reelsCount).keys()).forEach(i => {
            this.reels.push(new Reel(this.scene, this, reelWidthOffset + reelWidth * i, reelHeightOffset))
        })

        this.stoppedReelsCount = 0
    }

    run() {
        this.reels.forEach(reel => {
            reel.setAnimationState(reel.stateEnum.Accelerating)
            reel.runAnimationStep()
        })
    }

    stop() {
        this.reels.forEach(reel => reel.setAnimationState(reel.stateEnum.Decelerating))
    }

    onReelStop() {
        this.stoppedReelsCount++

        if (this.stoppedReelsCount == this.reels.length) {
            this.scene.onAllReelsStop()
            this.scene.audioObject.reel.stop()
            this.stoppedReelsCount = 0
        }
    }
}