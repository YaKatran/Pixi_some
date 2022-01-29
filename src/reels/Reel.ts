import * as PIXI from 'pixi.js'
import poolManager, { Pool, Pooled } from '../utils/poolManager'
import Icon from './Icon'
import ReelsConfig from './ReelsConfig'

const { symbolsDistance, symbolsInReel } = ReelsConfig

const iconsPool = new Pool(() => new Icon(), element => element.parent.removeChild(element))


export default class Reel extends PIXI.Container {
    private readonly speed = 3
    private readonly container = this.addChild(new PIXI.Container())
   
    private started = false
    private isStoping = false
    private idsToStop: number[]

    constructor() {
        super()
        
        this.container.y = -symbolsDistance
        this.fillContainer()
    }

    start() {
        if (this.started) {
            return
        }
        this.started = true
        PIXI.Ticker.shared.add(this.onTick)
    }

    stop() {
        if (this.started && !this.isStoping) {
            this.isStoping = true

        }
    }

    onTick = (delta: number) => {
        let newY = this.container.y + delta * this.speed
        if (newY >= 0) {
            const outIconsNumber = Math.ceil(newY / symbolsDistance)
            const offset = outIconsNumber * symbolsDistance
            newY -= offset
            for (const outIcon of (this.container.children.slice(0, outIconsNumber) as Pooled<Icon>[])){
                outIcon.returnToPool()
            }

            for (const icon of this.container.children) {
                icon.y += offset
            }
            if (this.isStoping) {
                newY = -symbolsDistance
                this.isStoping = false
                this.started = false
                PIXI.Ticker.shared.remove(this.onTick)
            }
            this.fillContainer()
        }
        this.container.y = newY
    }

    stopWith(ids: number[]) {
        this.idsToStop = ids.slice()
    }

    private getIconAt(positionInReel: number) {
        return this.container.children[symbolsInReel - positionInReel] as Icon
    }

    hideIconAt(positionInReel: number) {
        this.getIconAt(positionInReel).visible = false
    }
    showIconAt(positionInReel: number) {
        this.getIconAt(positionInReel).visible = true
    }


    private fillContainer() {
        for (let i = symbolsInReel + 2 - this.container.children.length; i--;) {
            const symbol = this.container.addChild(iconsPool.getElement())
            symbol.y = symbolsDistance * i
            if (this.idsToStop) {
                symbol.id = this.idsToStop[this.idsToStop.length - 1]
                this.idsToStop.pop()
                if (this.idsToStop.length === 0) {
                    this.idsToStop = undefined
                    this.stop()
                }
            } else {
                symbol.randomize()
            }
        }
    }


}