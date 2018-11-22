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
    constructor(src, canvasHelper, location, rotation, speed, rotationRate = 0) {
        super(src, canvasHelper);
        this.location = location;
        this.rotation = rotation;
        this.rotationRate = rotationRate;
        this.velocity = new Vector(Math.cos(MathHelper.toRadian(rotation)) * speed, Math.sin(MathHelper.toRadian(rotation)) * speed).multiply(5);
    }
    update() {
        this.move();
        this.rotation += this.rotationRate;
    }
}
class MathHelper {
    constructor() { }
    static randomNumber(min, max, digits = 0) {
        return Math.floor(Math.random() * (max - min) * (Math.pow(10, digits))) / (Math.pow(10, digits)) + min;
    }
    static toRadian(degrees) {
        return degrees * Math.PI / 180;
    }
}
class CanvasHelper {
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
        }).then(() => {
            callback();
        });
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    writeText(text, fontsize, xCoordinate, yCoordinate, align = "center", baseLine = "middle", color = "white", fontFamily = "Minecraft") {
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontsize}px ${fontFamily}`;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseLine;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    drawButton(src, caption, location) {
        this.drawImage(src, location, 0);
    }
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
        this.lives = 3;
        this.score = 0;
        this.location = canvasHelper.getCenter();
        this.rotation = 0;
        this.velocity = new Vector(0, 0);
    }
    update() {
        this.move();
    }
    eventCallBacks() { }
    getLives() {
        return this.lives;
    }
    getScore() {
        return this.score;
    }
}
class ViewBase {
    constructor(canvasHelper) {
        this.canvasHelper = canvasHelper;
    }
}
class GameView extends ViewBase {
    constructor(canvasHelper, callback = null) {
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
        let asteroidCount = MathHelper.randomNumber(5, 10);
        let asteroidImages = [
            { name: "Brown_big", images: [1, 2, 3, 4] },
            { name: "Brown_med", images: [1, 3] },
            { name: "Brown_small", images: [1, 2] },
            { name: "Brown_tiny", images: [1, 2] },
            { name: "Grey_big", images: [1, 2, 3, 4] },
            { name: "Grey_med", images: [1, 2] },
            { name: "Grey_small", images: [1, 2] },
            { name: "Grey_tiny", images: [1, 2] }
        ];
        for (let i = 0; i < asteroidCount; i++) {
            let asteroidType = asteroidImages[MathHelper.randomNumber(0, asteroidImages.length)];
            let asteroidSubImage = asteroidType.images[MathHelper.randomNumber(0, asteroidType.images.length)];
            let spriteSrc = `meteor${asteroidType.name}${asteroidSubImage}.png`;
            let x = MathHelper.randomNumber(0, this.canvasHelper.getWidth()), y = MathHelper.randomNumber(0, this.canvasHelper.getHeight()), rot = MathHelper.randomNumber(0, 360), speed = MathHelper.randomNumber(0.1, 1.2, 1);
            this.asteroids.push(new Asteroid(spriteSrc, canvasHelper, { x: x, y: y }, rot, speed));
        }
        if (callback)
            callback();
    }
    drawGUI() {
        for (let i = 0; i < this.player.getLives(); i++) {
            this.canvasHelper.drawImage("playerLife1_blue.png", { x: 48 + 32 * i, y: 32 }, 0);
        }
        this.canvasHelper.writeText(`Score: ${this.player.getScore()} points`, 24, this.canvasHelper.getWidth() - 32, 32, "right");
    }
}
class MenuView extends ViewBase {
    constructor(canvasHelper, callback) {
        super(canvasHelper);
        this.update = () => {
            this.canvasHelper.clear();
            this.menuAsteroid.update();
            this.drawGUI();
        };
        this.menuAsteroid = new Asteroid("meteorBrown_big1.png", canvasHelper, this.canvasHelper.getCenter(), 0, 0, .025);
        callback();
    }
    drawGUI() {
        this.canvasHelper.writeText("Asteroids", 96, this.canvasHelper.getCenter().x, 100);
        this.canvasHelper.writeText("Press Start to Play!", 48, this.canvasHelper.getCenter().x, this.canvasHelper.getHeight() - 50);
        this.menuAsteroid.draw();
        this.canvasHelper.drawButton("buttonBlue.png", "Start", { x: this.canvasHelper.getCenter().x, y: this.canvasHelper.getHeight() - 200 });
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
        this.canvasHelper = new CanvasHelper(canvas, () => { this.switchView(new MenuView(this.canvasHelper, () => setInterval(this.loop, 33))); });
    }
    switchView(newView) {
        this.currentView = newView;
    }
}
const game = new Game(document.getElementById('canvas'));
//# sourceMappingURL=app.js.map