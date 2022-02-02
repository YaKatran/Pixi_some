import * as PIXI from 'pixi.js'
import poolManager from '../utils/poolManager'
import Icon from './Icon'
import Reel from './Reel'
import ReelsConfig from './ReelsConfig'

export default class Reels extends PIXI.Container {
    reels: Reel[] = []

    constructor() {
        super()
        const { reels, reelsDistance, mask } = ReelsConfig

        for (let i = reels; i--;) {
            this.reels[i] = this.addChild(new Reel())
            this.reels[i].x = reelsDistance * i
        }
        this.mask = this.addChild((new PIXI.Graphics()).beginFill().drawRect(0, 0, mask.width, mask.height))

    }
    start() {
        for (const reel of this.reels) {
            reel.start()
        }
    }

    stop() {
        for (const reel of this.reels) {
            reel.stop()
        }
    }

    stopWith(ids: number[][]) {
        this.reels.forEach((reel, i) => {
            reel.stopWith(ids[i])
        });
    }

    getIconPosition(reelNumber: number, iconNumberOnReel: number): [number, number] {
        let x = (1280 - ReelsConfig.reelsDistance * ReelsConfig.reels) / 2 + (reelNumber + 0.5) * ReelsConfig.reelsDistance
        let y = (768 - ReelsConfig.symbolsDistance * ReelsConfig.symbolsInReel) / 2 + (iconNumberOnReel + 0.5) * ReelsConfig.symbolsDistance
        return [x, y]
    }

    showIconAt(reelNumber: number, iconNumberOnReel: number) {
        this.reels[reelNumber].showIconAt(iconNumberOnReel)
    }

    hideIconAt(reelNumber: number, iconNumberOnReel: number) {
        this.reels[reelNumber].hideIconAt(iconNumberOnReel)
    }

}


