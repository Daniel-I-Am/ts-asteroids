class Player extends Entity {
    private lives: number;
    private name: string;
    private score: number;

    public constructor(src: string, canvasHelper: CanvasHelper) {
        super(src, canvasHelper);
        this.lives = 3;
        this.score = 0;
        this.location = canvasHelper.getCenter();
        this.rotation = 0;
        this.velocity = new Vector(0, 0);
    }
    public update() {
        this.move();
    }
    public eventCallBacks() {}

    public getLives(): number {
        return this.lives;
    }
    public getScore(): number {
        return this.score;
    }
}