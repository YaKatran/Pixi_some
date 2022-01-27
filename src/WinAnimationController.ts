import * as PIXI from 'pixi.js'
import mainHolder from '.'
import Reels from './reels/Reels'

const linesDictionary = [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [2, 2, 2, 2, 2]]

export default class WinAnimationController {
    start(winLines: { line: number, icons: { position: [number, number], id: number }[] }[]) {
        const sprites: PIXI.Sprite[] = []
        const lines: PIXI.Graphics[] = []
        
        const {reels} = mainHolder.main
        for (const { line, icons } of winLines) {
            const lineCoordinates: [number, number][] = []
            linesDictionary[line].forEach((dict, i) => {
                lineCoordinates.push(reels.getIconPosition(i, linesDictionary[dict][i]))
            });
            lines.push(this.drawLine(lineCoordinates))
            for (const { position, id } of icons) {
                const sprite = PIXI.Sprite.from(`./assets/symbols/(${id}).png`)
                sprites.push(sprite)
                mainHolder.main.animationLayer.addChild(sprite)
                sprite.position.set(...reels.getIconPosition(...position))
                sprite.anchor.set(0.5)
                reels.hideIconAt(...position)
            }

        }

        const rotationSpeed = 0.5
        let rotationCountValue = 5 * 2 * Math.PI
        const onTick = (delta: number) => {
            const rotationValue = delta * rotationSpeed
            rotationCountValue -= rotationValue
            if (rotationCountValue <= 0) {
                PIXI.Ticker.shared.remove(onTick)
                for (const sprite of sprites) {
                    sprite.destroy()
                }
                for (const line of lines) {
                    line.destroy()
                }
                return
            }
            for (const sprite of sprites) {
                sprite.rotation += rotationValue
            }
        }

        PIXI.Ticker.shared.add(onTick)

    }

    drawLine(lineCoordinates: [number, number][]) {
        const line = new PIXI.Graphics
        line.lineStyle(3, 0xFF0000, 1);
        line.moveTo(...lineCoordinates[0])
        for (const coordinate of lineCoordinates) {
            line.lineTo(...coordinate)
        }
        return mainHolder.main.animationLayer.addChild(line)
    }
}