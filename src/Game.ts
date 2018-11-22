/// <reference path="Canvas.ts"/>
/// <reference path="Entity.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Asteroid.ts"/>
/// <reference path="Interfaces.ts"/>

class Game {
    private state: string;
    private player: Player;
    private asteroids: Array<Asteroid>;
    private highScores: Array<Score>

    public constructor() {}
    public loop() {}
    
}