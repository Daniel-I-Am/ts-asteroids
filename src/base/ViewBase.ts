namespace Asteroids {
    export abstract class ViewBase {
        protected canvasHelper: CanvasHelper

        protected constructor(canvasHelper: CanvasHelper) {
            // save the canvas helper, should be used in the drawGUI method
            this.canvasHelper = canvasHelper;
        }

        public abstract update(): void;
        protected abstract drawGUI(): void;
        public abstract beforeExit(): void;
    }
}