import * as PIXI from 'pixi.js'
import Reels from './reels/Reels'
import ReelsConfig from './reels/ReelsConfig'
import Panel from './panel/Panel'
import WinAnimationController from './winAnimationController'
import FakeService from './fakeService/FakeService'

export default class Main extends PIXI.Container {
    background: PIXI.Container = this.addChild(new PIXI.Container())
    reels: Reels = this.addChild(new Reels())
    panel: Panel = this.addChild(new Panel())
    animationLayer: PIXI.Container = this.addChild(new PIXI.Container())
    winAnimationController = new WinAnimationController()
    fakeService = new FakeService()
    constructor() {
        super()
        this.reels.position.set((1280 - ReelsConfig.reelsDistance * ReelsConfig.reels) / 2, (768 - ReelsConfig.symbolsDistance * ReelsConfig.symbolsInReel) / 2)
        this.panel.position.set(0, 768 - (768 - ReelsConfig.mask.height) / 2)
    }
}



