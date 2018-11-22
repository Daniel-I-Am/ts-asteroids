class Entity {
    constructor(src, canvasHelper) {
        this.canvasHelper = canvasHelper;
        this.image = new Image();
        this.image.src = src;
    }
    draw() {
        this.canvasHelper.drawImage(this.image, this.location, this.rotation);
    }
    ;
}
class Asteroid extends Entity {
    constructor(src, canvasHelper) {
        super(src, canvasHelper);
    }
    update() { }
}
class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    writeTextToCanvas(text, fontsize, xCoordinate, yCoordinate, color, alignment) { }
    writeImageToCanvas(src, xCoordinate, yCoordinate) { }
    writeButtonToCanvas() { }
    drawImage(image, location, rotation) {
        this.ctx.save();
        this.ctx.translate(location.x, location.y);
        this.ctx.rotate(rotation);
        this.ctx.drawImage(image, -image.width / 2, -image.height / 2);
        this.ctx.restore();
    }
    getCenter() {
        return { x: this.getWidth() / 2, y: this.getHeight() / 2 };
    }
    getWidth() {
        return this.canvas.width;
    }
    getHeight() {
        return this.canvas.height;
    }
}
class Player extends Entity {
    constructor(src, canvasHelper) {
        super(src, canvasHelper);
        this.location = canvasHelper.getCenter();
        this.rotation = 0;
        this.velocity = new Vector(0, 0);
    }
    update() {
        let velocity = this.velocity.getValue();
        this.location.x += velocity[0];
        this.location.y += velocity[1];
    }
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
            this.player.draw();
            this.asteroids.forEach(e => {
                e.draw();
            });
        };
        this.player = new Player("./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png", this.canvasHelper);
        this.asteroids = new Array();
    }
}
class Vector {
    constructor(...args) {
        this.numbers = args;
    }
    getValue() {
        return this.numbers;
    }
    getSize() {
        return Math.sqrt(this.numbers.map(e => Math.pow(e, 2)).reduce((a, b) => a + b, 0));
    }
    getDim() {
        return this.numbers.length;
    }
    add(vector) {
        if (this.getDim() != vector.getDim())
            throw new VectorDimError("Dimension of vector does not match.", `${this.getDim()} != ${vector.getDim()}`);
        let myValue = this.getValue(), thatValue = vector.getValue();
        return new Vector(...myValue.map((e, i) => e + thatValue[i]));
    }
    multiply(scalar) {
        return new Vector(...this.getValue().map(e => e * scalar));
    }
    toString() {
        return `[${this.getValue().map(e => e.toString()).join(", ")}]`;
    }
}
class VectorDimError {
    constructor(...args) {
        this.name = "VectorDimError";
        this.message = args.join("\n");
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.currentView.update();
        };
        this.canvasHelper = new Canvas(canvas);
        this.currentView = new GameView(this.canvasHelper);
    }
}
const game = new Game(document.getElementById('canvas'));
setInterval(game.loop, 33);
//# sourceMappingURL=app.js.map