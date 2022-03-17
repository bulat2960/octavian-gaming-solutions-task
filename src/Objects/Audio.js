/*
    Настройка аудиофайлов игры
*/
export default class Audio {
    constructor(scene) {
        this.scene = scene
        this.load()
    }

    load() {
        // Барабаны 
        this.reel = this.scene.sound.add('reel', {loop: true})
        this.reelStop = this.scene.sound.add('reel_stop')

        // Управляющие кнопки старт/стоп
        this.button = this.scene.sound.add('button', {volume: 3})

        // Таймер обратного отсчета 
        this.countdown = this.scene.sound.add('countdown')

        // Фон
        this.background = this.scene.sound.add('mall', {loop: true, volume: 0.5})
    }
}