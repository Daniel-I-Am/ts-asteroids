class Entity {
    constructor(src, canvasHelper) {
        this.canvasHelper = canvasHelper;
        this.src = src;
    }
    draw() {
        this.canvasHelper.drawImage(this.src, this.location, this.rotation);
    }
    ;
    move() {
        let velocity = this.velocity.getValue();
        this.location.x += velocity[0];
        this.location.y += velocity[1];
        if (this.location.x < 0)
            this.location.x = this.canvasHelper.getWidth();
        if (this.location.x > this.canvasHelper.getWidth())
            this.location.x = 0;
        if (this.location.y < 0)
            this.location.y = this.canvasHelper.getHeight();
        if (this.location.y > this.canvasHelper.getHeight())
            this.location.y = 0;
    }
}
class Asteroid extends Entity {
    constructor(src, canvasHelper) {
        super(src, canvasHelper);
    }
    update() { }
}
class Canvas {
    constructor(canvas, callback) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.spriteMap = new Image();
        this.spriteMap.src = "./assets/images/SpaceShooterRedux/Spritesheet/sheet.png";
        fetch('./assets/images/SpaceShooterRedux/Spritesheet/sheet.xml')
            .then((response) => {
            return response.text();
        })
            .then((str) => {
            let parser = new DOMParser();
            this.spriteMapData = [];
            Array.prototype.forEach.call(parser.parseFromString(str, "text/xml").getElementsByTagName("SubTexture"), (e) => {
                let atts = e.attributes;
                this.spriteMapData.push({ name: atts[0].nodeValue, x: parseInt(atts[1].nodeValue), y: parseInt(atts[2].nodeValue), width: parseInt(atts[3].nodeValue), height: parseInt(atts[4].nodeValue) });
            });
            console.table(this.spriteMapData);
        }).then(() => {
            callback();
        });
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    writeTextToCanvas(text, fontsize, xCoordinate, yCoordinate, color, alignment) { }
    writeImageToCanvas(src, xCoordinate, yCoordinate) { }
    writeButtonToCanvas() { }
    drawImage(src, location, rotation) {
        let image = this.spriteMapData.filter(obj => {
            return obj.name === src;
        })[0];
        if (!image)
            return null;
        this.ctx.save();
        this.ctx.translate(location.x, location.y);
        this.ctx.rotate(rotation);
        this.ctx.drawImage(this.spriteMap, image.x, image.y, image.width, image.height, -image.width / 2, -image.height / 2, image.width, image.height);
        this.ctx.restore();
        return image;
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
    clear() {
        this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    }
}
class Player extends Entity {
    constructor(src, canvasHelper) {
        super(src, canvasHelper);
        this.location = canvasHelper.getCenter();
        this.rotation = 0;
        this.velocity = new Vector(-1, -1);
    }
    update() {
        this.move();
    }
    eventCallBacks() { }
    getLives() {
        return this.lives;
    }
}
class ViewBase {
    constructor(canvasHelper) {
        this.canvasHelper = canvasHelper;
    }
}
class MenuView extends ViewBase {
    constructor(canvasHelper) {
        super(canvasHelper);
        this.update = () => { };
    }
    drawGUI() { }
}
class GameView extends ViewBase {
    constructor(canvasHelper) {
        super(canvasHelper);
        this.update = () => {
            this.canvasHelper.clear();
            this.player.update();
            this.asteroids.forEach(e => {
                e.update();
            });
            this.asteroids.forEach(e => {
                e.draw();
            });
            this.player.draw();
            this.drawGUI();
        };
        this.player = new Player("playerShip1_blue.png", this.canvasHelper);
        this.asteroids = new Array();
    }
    drawGUI() {
        for (let i = 0; i < this.player.getLives(); i++) {
        }
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
        this.canvasHelper = new Canvas(canvas, () => setInterval(this.loop, 33));
        this.currentView = new GameView(this.canvasHelper);
    }
}
const game = new Game(document.getElementById('canvas'));
//# sourceMappingURL=app.js.map