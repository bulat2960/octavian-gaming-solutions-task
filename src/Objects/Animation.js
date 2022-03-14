import Settings from '../settings'

export default class Animation {
    constructor(scene) {
        this.scene = scene
        this.addAnimation()
    }

    addAnimation() {
        this.containerAnimation1 = this.scene.tweens.add({
            targets: this.scene.containers[0],
            props: { y: { value: "+=" + Settings.symbolHeight, 
            duration: 1000 }},
            repeat: 5,
            onRepeat: this.onRepeat,
            onComplete: this.onComplete
        }, this)

        /*this.containerAnimation2 = this.scene.tweens.add({
            targets: this.scene.containers[1],
            props: { y: { value: "+=" + Settings.symbolHeight, 
            duration: 100 }},
            repeat: 10,
            onRepeat: this.onRepeat,
            onComplete: this.onComplete
        }, this)

        this.containerAnimation3 = this.scene.tweens.add({
            targets: this.scene.containers[2],
            props: { y: { value: "+=" + Settings.symbolHeight, 
            duration:  100 } },
            repeat: 20,
            onRepeat: this.onRepeat,
            onComplete: this.onComplete
        })*/
    }

    onRepeat() {
        const randomNumber = Phaser.Math.RND.between(1, 11);
        this.updateTo('y', this.targets[0].y + Settings.symbolHeight, true);
        this.targets[0].first.y = this.targets[0].last.y - Settings.symbolHeight;
        const symbol = this.targets[0].first;
        console.log("Before replace", this.targets[0].first.texture.key)
        symbol.setTexture('symbol_blur_' + randomNumber);
        this.targets[0].moveTo(symbol, this.targets[0].length - 1)
    }

    onComplete() {
        this.targets[0].scene.tweens.add({
            targets : this.targets[0],
            props: { y: { value: "-=" + Settings.symbolHeight, duration: 1000 } },
            repeat : 3,
            onRepeat : function() {
                this.updateTo('y', this.targets[0].y - Settings.symbolHeight, true);
                this.targets[0].last.y = this.targets[0].first.y + Settings.symbolHeight;
                const symbol = this.targets[0].last;

                let imageName = symbol.texture.key
                symbol.setTexture('symbol_' + imageName[imageName.length - 1])

                this.targets[0].moveTo(symbol, 0);
            },
            onComplete : function() {
                for (let i = 0; i < this.targets[0].length; i++) {
                    let imageName = this.targets[0].list[i].texture.key
                    this.targets[0].list[i].setTexture('symbol_' + imageName[imageName.length - 1]);
                }
            }
        }, this.targets[0]);
    }
}