/// <reference path="Canvas.ts"/>
/// <reference path="Entity.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Asteroid.ts"/>

interface Location {
    x: number;
    y: number
}

interface Score {
    playerName: string;
    score: number;
}

class Game {
    private state: string;
    private player: Player;
    private asteroids: Array<Asteroid>;
    private highScores: Array<Score>

    public constructor() {}
    public loop() {}
    
}