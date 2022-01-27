import * as PIXI from 'pixi.js'
import Icon from './Icon'
import ReelsConfig from './ReelsConfig'

const { symbolsDistance, symbolsInReel } = ReelsConfig

export default class Reel extends PIXI.Container {
    private readonly speed = 3
    private readonly container = this.addChild(new PIXI.Container())
    private pool: { get: () => Icon, release: (...icons: Icon[]) => void }
    private started = false
    private isStoping = false
    private idsToStop: number[]

    constructor(pool: { get: () => Icon, release: (...icons: Icon[]) => void }) {
        super()
        this.pool = pool
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
            const outIcons = this.container.children.slice(0, outIconsNumber) as Icon[]
            this.container.removeChild(...outIcons)
            this.pool.release(...outIcons)
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
            const symbol = this.container.addChild(this.pool.get())
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