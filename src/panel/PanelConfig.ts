import * as PIXI from 'pixi.js'

export default {
    mask: {
        width: 1280,
        height: (768 - (3 * 128))/2
    },
    
    style: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 1,
        wordWrap: true,
        wordWrapWidth: 440,
    }),
}