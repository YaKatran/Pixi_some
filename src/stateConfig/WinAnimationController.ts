import * as PIXI from 'pixi.js'
import mainHolder from '..'
import IWinLine from '../fakeService/IWinLine'
import StateController from './StateController'
import { StateEvent } from './StateEnums'

const linesDictionary: { [id: number]: number[] } = {
    1: [0, 0, 0, 0, 0],
    2: [1, 1, 1, 1, 1],
    3: [2, 2, 2, 2, 2],
    4: [0, 0, 1, 2, 2],
    5: [2, 2, 1, 0, 0],
    6: [0, 1, 1, 1, 2],
    7: [2, 1, 1, 1, 0],
    8: [1, 2, 2, 2, 1],
    9: [1, 0, 0, 0, 1]
}

export default class WinAnimationController extends StateController{
    go() {
        return new Promise<StateEvent>(resolve => {

            const positionsSprites: Map<[number,number], PIXI.Sprite> = new Map<[number,number], PIXI.Sprite>()
            const lines: PIXI.Graphics[] = []
            const winLines = mainHolder.main.model.getWinlines()
            const { reels } = mainHolder.main
            for (const { lineId, icons } of winLines) {
                const lineCoordinates: [number, number][] = []
                linesDictionary[lineId].forEach((y, x) => {
                    lineCoordinates.push(reels.getIconPosition(x, y))
                });
                lines.push(this.drawLine(lineCoordinates))
                for (const { position, id } of icons) {
                    const sprite = PIXI.Sprite.from(`./assets/symbols/(${id}).png`)
                    positionsSprites.set(position, sprite)
                    mainHolder.main.animationLayer.addChild(sprite)
                    sprite.position.set(...reels.getIconPosition(...position))
                    sprite.anchor.set(0.5)
                    reels.hideIconAt(...position)
                }
    
            }
    
            const rotationSpeed = 0.1
            let rotationCountValue = 5 * 2 * Math.PI
            const onTick = (delta: number) => {
                const rotationValue = delta * rotationSpeed
                rotationCountValue -= rotationValue
                if (rotationCountValue <= 0) {
                    PIXI.Ticker.shared.remove(onTick)
    
                    for (const [position, sprite] of positionsSprites) {
                        sprite.destroy()
                        reels.showIconAt(...position)
                    }
                    for (const line of lines) {
                        line.destroy()
                    }
                    resolve(StateEvent.AnimationEnded)
                    return
                }
                for (const [,sprite] of positionsSprites) {
                    sprite.rotation += rotationValue
                }
            }
    
            PIXI.Ticker.shared.add(onTick)
        })


    }

    private drawLine(lineCoordinates: [number, number][]) {
        const line = new PIXI.Graphics()
        line.lineStyle(3, 0xFF0000, 1);
        line.moveTo(...lineCoordinates[0])
        for (const coordinate of lineCoordinates) {
            line.lineTo(...coordinate)
        }
        return mainHolder.main.animationLayer.addChild(line)
    }
}