import * as PIXI from 'pixi.js'
import Button from './Button'
import PanelConfig from './PanelConfig'

export default class Panel extends PIXI.Container{
    private startButton: Button
    private leftButton: Button
    private rightButton: Button
    private bet = 10
    private betText: PIXI.Text
    private balance = 100
    private balanceText: PIXI.Text
    private balanceValueText: PIXI.Text

    
    constructor(){
        super()
        this.addChild((new PIXI.Graphics()).beginFill(0x999999).drawRect(0,0,PanelConfig.mask.width, PanelConfig.mask.height))
        this.startButton = this.addChild(new Button(() => (window as any).main.reels.start(), PIXI.Sprite.from('./assets/buttons/start.png')))
        this.leftButton = this.addChild(new Button(() => this.setBet(-5), PIXI.Sprite.from('./assets/buttons/leftArrow.png')))
        this.rightButton = this.addChild(new Button(() => this.setBet(+5), PIXI.Sprite.from('./assets/buttons/rightArrow.png')))
        this.betText = this.addChild(new PIXI.Text(`${this.bet}`, PanelConfig.style))
        this.balanceText = this.addChild(new PIXI.Text(`Balance:`, PanelConfig.style))
        this.balanceValueText = this.addChild(new PIXI.Text(`${this.balance}`, PanelConfig.style))
        
        this.startButton.position.set(PanelConfig.mask.width/2, PanelConfig.mask.height/2)
        this.leftButton.position.set(PanelConfig.mask.width * 5 / 6 - 100, PanelConfig.mask.height/2)
        this.rightButton.position.set(PanelConfig.mask.width * 5 / 6 + 100, PanelConfig.mask.height/2)
        this.betText.position.set(PanelConfig.mask.width * 5 / 6, PanelConfig.mask.height/2)
        this.balanceText.position.set(PanelConfig.mask.width / 6, PanelConfig.mask.height/2 - 25)
        this.balanceValueText.position.set(PanelConfig.mask.width / 6, PanelConfig.mask.height/2 + 25)

        this.betText.anchor.set(0.5)
        this.balanceText.anchor.set(0.5)
        this.balanceValueText.anchor.set(0.5)
    }
   
    setBet(value: number){
        this.bet += value
        if (this.bet < 5) this.bet = 5
        this.betText.text = `${this.bet}`
    }

    setBalance(value: number){
        this.balanceValueText.text = `${value}` 
    }
}