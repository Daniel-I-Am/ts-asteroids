/// <reference path="Entity.ts"/>
class Asteroid extends Entity {

    public constructor(src: string, canvasHelper: CanvasHelper, location: Location, rotation: number, speed: number) {
        super(src, canvasHelper);
        this.location = location;
        this.rotation = rotation;
        this.velocity = new Vector(Math.cos(MathHelper.toRadian(rotation))*speed, Math.sin(MathHelper.toRadian(rotation))*speed).multiply(5);
    }

    public update() {
        this.move();
    }
}