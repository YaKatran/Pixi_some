import * as PIXI from 'pixi.js'
import ReelsConfig from './reels/ReelsConfig'

export default class ResourseLoader {
    constructor(callback: () => void) {
        for (const id of ReelsConfig.symbolIds) {
            PIXI.Loader.shared.add(`assets/symbols/(${id}).png`)
        }

        PIXI.Loader.shared.load(callback)
    }
}