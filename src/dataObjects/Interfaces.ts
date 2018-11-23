interface Location {
    x: number;
    y: number;
}

interface Score {
    playerName: string;
    score: number;
}

interface SpriteSheetTexture {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface AsteroidImage {
    name: string;
    images: number[];
}