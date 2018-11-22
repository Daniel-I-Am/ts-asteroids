class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
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