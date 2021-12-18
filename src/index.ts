const app = new PIXI.Application({ sharedTicker: true, sharedLoader: true });
document.body.appendChild(app.view);
PIXI.Loader.shared.add("hui", "assets/hui.png");
PIXI.Loader.shared.load(() => {
    app.stage.addChild(PIXI.Sprite.from("hui"));
});
