import * as PIXI from 'pixi.js'
import ReelsConfig from './ReelsConfig'

export default class Icon extends PIXI.Container {
    private sprite = this.addChild(new PIXI.Sprite())
    constructor() {
        super()
        const { symbolsDistance, reelsDistance } = ReelsConfig
        this.sprite.anchor.set(0.5)
        this.sprite.position.set(reelsDistance / 2, symbolsDistance / 2)
    }
    set id(value: number) {
        this.sprite.texture = PIXI.Texture.from(`./assets/symbols/(${value}).png`)
    }

    randomize() {
        const { symbolIds } = ReelsConfig
        this.id = symbolIds[Math.floor(Math.random() * symbolIds.length)]
    }
}