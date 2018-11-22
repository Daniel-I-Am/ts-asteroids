/// <reference path="Entity.ts"/>
class Player extends Entity {
    private lives: number;
    private name: string;
    private score: number;

    public constructor(src: string, canvasHelper: Canvas) {
        super(src, canvasHelper);
        this.location = canvasHelper.getCenter();
        this.rotation = 0;
        this.velocity = new Vector(1, 2);
        console.log(this.velocity.getSize());
    }
    public update() {

    }
    public eventCallBacks() {}
}