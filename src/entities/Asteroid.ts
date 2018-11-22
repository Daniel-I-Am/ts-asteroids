class Asteroid extends Entity {
    private rotationRate: number;

    public constructor(src: string, canvasHelper: CanvasHelper, location: Location, rotation: number, speed: number, rotationRate: number = 0) {
        super(src, canvasHelper);
        this.location = location;
        this.rotation = rotation;
        this.rotationRate = rotationRate;
        this.velocity = new Vector(Math.cos(MathHelper.toRadian(rotation))*speed, Math.sin(MathHelper.toRadian(rotation))*speed).multiply(5);
    }

    public update() {
        this.move();
        this.rotation += this.rotationRate;
    }
}