namespace Asteroids {
    export class Player extends Entity {
        public keyHelper: KeyHelper;
        private lives: number;
        private name: string;
        private score: number;
        private maxSpeed: number;

        public constructor(src: string, canvasHelper: CanvasHelper) {
            super(src, canvasHelper);
            this.keyHelper = new KeyHelper();
            this.maxSpeed = 20;
            this.lives = 3;
            this.score = 0;
            this.location = canvasHelper.getCenter();
            this.rotation = 0;
            this.velocity = new Vector(0, 0);
        }

        public update() {
            let rotationRate = .1,
                acceleration = .2;
            if (this.keyHelper.leftPressed) this.rotation -= rotationRate;
            if (this.keyHelper.rightPressed) this.rotation += rotationRate;
            if (this.keyHelper.upPressed) this.velocity = this.velocity.sub((new Vector(0, 1).multiply(acceleration).rotate(this.rotation))).max(this.maxSpeed);
            if (this.keyHelper.downPressed) this.velocity = this.velocity.sub((new Vector(0, -1).multiply(acceleration).rotate(this.rotation))).max(this.maxSpeed);
            this.move();
        }

        public getLives(): number {
            return this.lives;
        }
        public getScore(): number {
            return this.score;
        }
    }
}