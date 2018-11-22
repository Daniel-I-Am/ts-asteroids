class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    
    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    public writeTextToCanvas(
        text: string,
        fontsize: number,
        xCoordinate: number,
        yCoordinate: number,
        color: string,
        alignment: CanvasTextAlign,
    ) {}
    public writeImageToCanvas(
        src: string,
        xCoordinate: number,
        yCoordinate: number,
    ) {}
    public writeButtonToCanvas(

    ) {}

    public static drawImage(
        image: HTMLImageElement,
        location: Location,
        rotation: number
    ) {}
}