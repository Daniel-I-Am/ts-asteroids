/// <reference path="Entity.ts"/>
class Player extends Entity {
    private lives: number;
    private name: string;
    private score: number;

    public constructor(src: string) {
        super(src);
    }
    public update() {}
    public eventCallBacks() {}
}