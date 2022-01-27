import * as PIXI from 'pixi.js'
import ReelsConfig from '../reels/ReelsConfig'
// import Reels from './Reels'
// import Reel from './Reel'

export default class Button extends PIXI.Container{
    
    private sprite: PIXI.Sprite
    private defaultTint = 0xEEEEEE
    private pressed = false

    

    constructor(private callback: () => void, sprite: PIXI.Sprite){
        super()
        this.sprite = sprite
        this.sprite.anchor.set(0.5)
        this.sprite.interactive = true
        this.sprite.buttonMode = true
        this.sprite.tint = this.defaultTint
        this.sprite.on('pointerdown', this.onPointerDown)
        this.sprite.on('pointerup', this.onPointerUp)
        this.sprite.on('pointerover', this.onPointerOver)
        this.sprite.on('pointerout', this.onPointerOut)
        this.sprite.on('pointeroutside', this.onPointerOut)
        this.sprite.on('pointercancel', this.onPointerOut)
        this.addChild(this.sprite)
    }
    

    private onPointerUp = () => {
        if (this.pressed) {
            this.sprite.tint = 0xFFFFFF
            this.callback()
            this.pressed = false
        }
        
    }
    
    private onPointerOver = () => this.sprite.tint = 0xFFFFFF
    private onPointerDown = () => {
        this.pressed = true
        this.sprite.tint = 0x999999
    }
        
    private onPointerOut = () => this.sprite.tint = this.defaultTint
    
}
