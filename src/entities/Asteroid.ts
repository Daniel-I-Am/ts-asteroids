namespace Asteroids {
    export class Asteroid extends Entity {
        private rotationRate: number;

        public constructor(src: string, canvasHelper: CanvasHelper, location: Location, rotation: number, speed: number, rotationRate: number = 0) {
            super(src, canvasHelper);
            this.location = location;
            this.rotation = rotation;
            this.rotationRate = rotationRate;
            // the velocity is a new vector based on the rotation of the asteroid. This is then multiplied by its velocity
            this.velocity = new Vector(Math.cos(MathHelper.toRadian(rotation)), Math.sin(MathHelper.toRadian(rotation))).multiply(speed);
        }

        public update() {
            // just move the asteroid and rotate it, that's all
            this.move();
            this.rotation += this.rotationRate;
        }
    }
}