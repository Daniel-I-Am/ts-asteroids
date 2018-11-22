abstract class ViewBase {
    protected canvasHelper: CanvasHelper

    protected constructor(canvasHelper: CanvasHelper) {
        this.canvasHelper = canvasHelper;
    }

    public abstract update(): void;
    protected abstract drawGUI(): void;
}