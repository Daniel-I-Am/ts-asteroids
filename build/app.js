class Entity {
    constructor(src) {
        this.image = new Image();
        this.image.src = src;
    }
    draw() {
        Canvas.drawImage(this.image, this.location, this.rotation);
    }
    ;
}
class Asteroid extends Entity {
    constructor(src) {
        super(src);
    }
    update() { }
}
class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
    writeTextToCanvas(text, fontsize, xCoordinate, yCoordinate, color, alignment) { }
    writeImageToCanvas(src, xCoordinate, yCoordinate) { }
    writeButtonToCanvas() { }
    static drawImage(image, location, rotation) { }
}
class Player extends Entity {
    constructor(src) {
        super(src);
    }
    update() { }
    eventCallBacks() { }
}
class ViewBase {
    constructor(canvasHelper) {
        this.canvasHelper = canvasHelper;
    }
}
class MenuView extends ViewBase {
    constructor(canvasHelper) {
        super(canvasHelper);
        this.update = () => {
        };
    }
}
class GameView extends ViewBase {
    constructor(canvasHelper) {
        super(canvasHelper);
        this.update = () => {
            this.player.update();
            this.asteroids.forEach(e => {
                e.update();
            });
        };
        this.player = new Player("./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png");
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.currentView.update();
        };
        this.canvasHelper = new Canvas(canvas);
        this.currentView = new MenuView(this.canvasHelper);
    }
}
const game = new Game(document.getElementById('canvas'));
setInterval(game.loop, 33);
//# sourceMappingURL=app.js.map