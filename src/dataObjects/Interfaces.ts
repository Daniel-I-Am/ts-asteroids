namespace Asteroids {
    export interface Location {
        x: number;
        y: number;
    }

    export interface Score {
        playerName: string;
        score: number;
    }

    export interface SpriteSheetTexture {
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
    }

    export interface AsteroidImage {
        name: string;
        images: number[];
    }
}