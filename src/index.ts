import * as PIXI from 'pixi.js'
import Main from './Main';
import Pooled from './reels/Pooled';
import ResourseLoader from './ResourseLoader';


const app = new PIXI.Application({ sharedTicker: true, sharedLoader: true, width: 1280, height: 768 });
document.body.appendChild(app.view);

const mainHolder:{main:Main} = {
    main: undefined
}

const loader = new ResourseLoader(() => app.stage.addChild(mainHolder.main = (window as any).main = new Main()));
(window as any).PIXI = PIXI

export default mainHolder