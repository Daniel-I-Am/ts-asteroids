abstract class Entity {
    private image: HTMLImageElement;
    private location: Location;
    private rotation: number;
    private speed: number;

    protected constructor(src: string) {
        this.image = new Image();
        this.image.src = src;
    }

    public draw(): void {
        Canvas.drawImage(this.image, this.location, this.rotation);
    };

    public abstract update(): void;
}