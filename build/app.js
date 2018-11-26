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
            throw new Error(`Dimension of vector does not match.\n${this.getDim()} != ${vector.getDim()}`);
        let myValue = this.getValue(), thatValue = vector.getValue();
        return new Vector(...myValue.map((e, i) => e + thatValue[i]));
    }
    sub(vector) {
        return this.add(vector.multiply(-1));
    }
    multiply(scalar) {
        return new Vector(...this.getValue().map(e => e * scalar));
    }
    normalize() {
        return this.multiply(1 / this.getSize());
    }
    max(n) {
        if (this.getSize() <= n)
            return this;
        return this.multiply(n / this.getSize());
    }
    min(n) {
        if (this.getSize() >= n)
            return this;
        return this.multiply(n / this.getSize());
    }
    rotate(radians) {
        if (this.getDim() != 2)
            throw new Error(`Rotate can only be called on a 2-dim vector\n${this.getDim()} != 2`);
        let myValue = this.getValue();
        let x = myValue[0], y = myValue[1];
        return new Vector(x * Math.cos(radians) - y * Math.sin(radians), x * Math.sin(radians) + y * Math.cos(radians));
    }
    toString() {
        return `[${this.getValue().map(e => e.toString()).join(", ")}]`;
    }
}
var Asteroids;
(function (Asteroids) {
    class MathHelper {
        constructor() { }
        static randomNumber(min, max, digits = 0) {
            return Math.floor(Math.random() * (max - min) * (Math.pow(10, digits))) / (Math.pow(10, digits)) + min;
        }
        static toRadian(degrees) {
            return degrees * Math.PI / 180;
        }
    }
    Asteroids.MathHelper = MathHelper;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class CanvasHelper {
        constructor(canvas, callback) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.spriteMap = new Image();
            this.spriteMap.addEventListener('load', () => {
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
            });
            this.spriteMap.src = "./assets/images/SpaceShooterRedux/Spritesheet/sheet.png";
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        writeText(text, fontsize, location, align = "center", baseLine = "middle", color = "white", fontFamily = "Minecraft") {
            this.ctx.fillStyle = color;
            this.ctx.font = `${fontsize}px ${fontFamily}`;
            this.ctx.textAlign = align;
            this.ctx.textBaseline = baseLine;
            this.ctx.fillText(text, location.x, location.y);
        }
        drawButton(src, caption, location, callback = null) {
            let image = this.drawImage(src, location, 0);
            if (!image)
                return;
            this.writeText(caption, 24, location, "center", "middle", "black");
            if (!callback)
                return;
            let _listener = (event) => {
                let topleft = { x: this.canvas.offsetLeft + location.x - image.width / 2, y: this.canvas.offsetTop + location.y - image.height / 2 }, bottomRight = { x: this.canvas.offsetLeft + location.x + image.width / 2, y: this.canvas.offsetTop + location.y + image.height / 2 };
                if (event.x < bottomRight.x && event.x > topleft.x && event.y < bottomRight.y && event.y > topleft.y) {
                    this.canvas.removeEventListener('click', _listener);
                    callback(event);
                }
            };
            this.canvas.addEventListener('click', _listener);
        }
        drawImage(src, location, rotation) {
            let image = this.getImage(src);
            if (!image)
                return null;
            this.ctx.save();
            this.ctx.translate(location.x, location.y);
            this.ctx.rotate(rotation);
            this.ctx.drawImage(this.spriteMap, image.x, image.y, image.width, image.height, -image.width / 2, -image.height / 2, image.width, image.height);
            this.ctx.restore();
            return image;
        }
        getImage(src) {
            let image = this.spriteMapData.filter(obj => {
                return obj.name === src;
            })[0];
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
        clearRect(src, location, rotation) {
            let image = this.getImage(src);
            if (!image)
                return null;
            this.ctx.save();
            this.ctx.translate(location.x, location.y);
            this.ctx.rotate(rotation);
            this.ctx.clearRect(-image.width / 2, -image.height / 2, image.width, image.height);
            this.ctx.restore();
        }
    }
    Asteroids.CanvasHelper = CanvasHelper;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class KeyHelper {
        constructor() {
            this.keyDownHandler = (event) => {
                switch (event.keyCode) {
                    case 37:
                    case 65:
                        this.leftPressed = true;
                        break;
                    case 38:
                    case 87:
                        this.upPressed = true;
                        break;
                    case 39:
                    case 68:
                        this.rightPressed = true;
                        break;
                    case 40:
                    case 83:
                        this.downPressed = true;
                        break;
                }
            };
            this.keyUpHandler = (event) => {
                switch (event.keyCode) {
                    case 37:
                    case 65:
                        this.leftPressed = false;
                        break;
                    case 38:
                    case 87:
                        this.upPressed = false;
                        break;
                    case 39:
                    case 68:
                        this.rightPressed = false;
                        break;
                    case 40:
                    case 83:
                        this.downPressed = false;
                        break;
                }
            };
            this.leftPressed = false;
            this.rightPressed = false;
            this.upPressed = false;
            this.downPressed = false;
            window.addEventListener("keydown", this.keyDownHandler);
            window.addEventListener("keyup", this.keyUpHandler);
        }
        destroy() {
            window.removeEventListener("keydown", this.keyDownHandler);
            window.removeEventListener("keyup", this.keyUpHandler);
        }
    }
    Asteroids.KeyHelper = KeyHelper;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class Entity {
        constructor(src, canvasHelper) {
            this.canvasHelper = canvasHelper;
            this.src = src;
        }
        draw() {
            this.canvasHelper.drawImage(this.src, this.location, this.rotation);
        }
        ;
        undraw() {
            this.canvasHelper.clearRect(this.src, this.location, this.rotation);
        }
        move() {
            let velocity = this.velocity.getValue();
            this.location.x += velocity[0];
            this.location.y += velocity[1];
            let myImage = this.canvasHelper.getImage(this.src);
            if (this.location.x < -myImage.width / 2)
                this.location.x += this.canvasHelper.getWidth() + myImage.width;
            if (this.location.x > this.canvasHelper.getWidth() + myImage.width / 2)
                this.location.x -= this.canvasHelper.getWidth() + myImage.width;
            if (this.location.y < -myImage.height / 2)
                this.location.y += this.canvasHelper.getHeight() + myImage.height;
            if (this.location.y > this.canvasHelper.getHeight() + myImage.height / 2)
                this.location.y -= this.canvasHelper.getHeight() + myImage.width;
        }
        changeSprite(newSrc) {
            this.src = newSrc;
        }
    }
    Asteroids.Entity = Entity;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class ViewBase {
        constructor(canvasHelper) {
            this.canvasHelper = canvasHelper;
        }
    }
    Asteroids.ViewBase = ViewBase;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class Player extends Asteroids.Entity {
        constructor(src, canvasHelper) {
            super(src, canvasHelper);
            this.keyHelper = new Asteroids.KeyHelper();
            this.maxSpeed = 20;
            this.lives = 3;
            this.score = 0;
            this.location = canvasHelper.getCenter();
            this.rotation = 0;
            this.velocity = new Vector(0, 0);
        }
        update() {
            let rotationRate = .1, acceleration = .2;
            if (this.keyHelper.leftPressed)
                this.rotation -= rotationRate;
            if (this.keyHelper.rightPressed)
                this.rotation += rotationRate;
            if (this.keyHelper.upPressed)
                this.velocity = this.velocity.sub((new Vector(0, 1).multiply(acceleration).rotate(this.rotation))).max(this.maxSpeed);
            if (this.keyHelper.downPressed)
                this.velocity = this.velocity.sub((new Vector(0, -1).multiply(acceleration).rotate(this.rotation))).max(this.maxSpeed);
            this.move();
        }
        getLives() {
            return this.lives;
        }
        getScore() {
            return this.score;
        }
    }
    Asteroids.Player = Player;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class Asteroid extends Asteroids.Entity {
        constructor(src, canvasHelper, location, rotation, speed, rotationRate = 0) {
            super(src, canvasHelper);
            this.location = location;
            this.rotation = rotation;
            this.rotationRate = rotationRate;
            this.velocity = new Vector(Math.cos(Asteroids.MathHelper.toRadian(rotation)), Math.sin(Asteroids.MathHelper.toRadian(rotation))).multiply(speed);
        }
        update() {
            this.move();
            this.rotation += this.rotationRate;
        }
    }
    Asteroids.Asteroid = Asteroid;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class GameView extends Asteroids.ViewBase {
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
            this.player = new Asteroids.Player("playerShip1_blue.png", this.canvasHelper);
            this.asteroids = new Array();
            let asteroidCount = Asteroids.MathHelper.randomNumber(5, 10);
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
                let asteroidType = asteroidImages[Asteroids.MathHelper.randomNumber(0, asteroidImages.length)];
                let asteroidSubImage = asteroidType.images[Asteroids.MathHelper.randomNumber(0, asteroidType.images.length)];
                let spriteSrc = `meteor${asteroidType.name}${asteroidSubImage}.png`;
                let x = Asteroids.MathHelper.randomNumber(0, this.canvasHelper.getWidth()), y = Asteroids.MathHelper.randomNumber(0, this.canvasHelper.getHeight()), rot = Asteroids.MathHelper.randomNumber(0, 360), speed = Asteroids.MathHelper.randomNumber(0.5, 6, 1);
                this.asteroids.push(new Asteroids.Asteroid(spriteSrc, canvasHelper, { x: x, y: y }, rot, speed));
            }
            if (callback)
                callback();
        }
        drawGUI() {
            for (let i = 0; i < this.player.getLives(); i++) {
                this.canvasHelper.drawImage("playerLife1_blue.png", { x: 48 + 32 * i, y: 32 }, 0);
            }
            this.canvasHelper.writeText(`Score: ${this.player.getScore()} points`, 24, { x: this.canvasHelper.getWidth() - 32, y: 32 }, "right");
        }
        beforeExit() {
            this.player.keyHelper.destroy();
        }
        ;
    }
    Asteroids.GameView = GameView;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class MenuView extends Asteroids.ViewBase {
        constructor(canvasHelper, callback, changeView) {
            super(canvasHelper);
            this.update = () => {
                this.menuAsteroid.undraw();
                this.menuAsteroid.update();
                this.drawGUI();
            };
            this.menuAsteroid = new Asteroids.Asteroid("meteorBrown_big1.png", canvasHelper, this.canvasHelper.getCenter(), 0, 0, .025);
            this.canvasHelper.writeText("Asteroids", 96, { x: this.canvasHelper.getCenter().x, y: 100 });
            this.canvasHelper.writeText("Press Start to Play!", 48, { x: this.canvasHelper.getCenter().x, y: this.canvasHelper.getHeight() - 50 });
            this.canvasHelper.drawButton("buttonBlue.png", "Start", { x: this.canvasHelper.getCenter().x, y: this.canvasHelper.getHeight() - 200 }, (_) => changeView(new Asteroids.GameView(canvasHelper, () => callback())));
            callback();
        }
        drawGUI() {
            this.menuAsteroid.draw();
        }
        beforeExit() { }
    }
    Asteroids.MenuView = MenuView;
})(Asteroids || (Asteroids = {}));
var Asteroids;
(function (Asteroids) {
    class Game {
        constructor(canvas) {
            this.loop = () => {
                this.currentView.update();
            };
            this.currentInterval = null;
            this.canvasHelper = new Asteroids.CanvasHelper(canvas, () => { this.switchView(new Asteroids.MenuView(this.canvasHelper, () => { this.newInterval = setInterval(this.loop, 33); }, (newView) => this.switchView(newView))); });
        }
        switchView(newView) {
            clearInterval(this.currentInterval);
            this.currentInterval = this.newInterval;
            if (this.currentView)
                this.currentView.beforeExit();
            this.currentView = newView;
        }
    }
    Asteroids.Game = Game;
})(Asteroids || (Asteroids = {}));
const game = new Asteroids.Game(document.getElementById('canvas'));
var Asteroids;
(function (Asteroids) {
    class TitleView extends Asteroids.ViewBase {
        constructor(canvasHelper, callback, highscores = new Array(), score = 0) {
            super(canvasHelper);
            this.canvasHelper.writeText(`You died with ${score} points!`, 48, { x: this.canvasHelper.getCenter().x, y: 100 });
            this.canvasHelper.writeText("Highscores", 32, { x: this.canvasHelper.getCenter().x, y: this.canvasHelper.getCenter().y - 100 });
            highscores.forEach((e, i) => {
                this.canvasHelper.writeText(`${e.playerName} - ${e.score}`, 32, { x: this.canvasHelper.getCenter().x, y: this.canvasHelper.getCenter().y - 100 + 32 * i });
            });
            callback();
        }
        update() { }
        drawGUI() { }
        beforeExit() { }
    }
    Asteroids.TitleView = TitleView;
})(Asteroids || (Asteroids = {}));
//# sourceMappingURL=app.js.map