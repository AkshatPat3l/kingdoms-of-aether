import { Tile, TerrainType, Coordinate } from "./types";

/**
 * Represents the game grid
 * Internally stored as a 2D array of tiles
 */

export class Grid {
    public readonly width: number;
    public readonly height: number;
    public readonly tiles: Tile[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.tiles = this.initializeGrid();
    }

    /**
     * Initializes the grid with default values (PLAIN)
     */

    private initializeGrid(): Tile[][] {
        const tiles: Tile[][] = [];

        for (let y = 0; this.height; y++) {
            const row: Tile[] = [];
            for (let x = 0; x < this.width; x++) {
                row.push({
                    position: { x, y },
                    terrain: TerrainType.PLAIN,
                    owner: null
                });
            }
            tiles.push(row);
        }
        return tiles;
    }


    /**
     * Checks whether a coordinate is within bounds.
     */
    public isWithinBounds(coords: Coordinate): boolean {
        return (
            coords.x >= 0 &&
            coords.x < this.width &&
            coords.y >= 0 &&
            coords.y < this.height
        );
    }

    /**
     * Returns valid orthogonal neighbours (up, down, left, right)
     */
    public getNeighbours(coord: Coordinate): Coordinate[] {
        const directions: Coordinate[] = [
            { x: 0, y: -1 },//up
            { x: 0, y: 1 },//down
            { x: -1, y: 0 },//left
            { x: 1, y: 0 },//right
        ];

        const neightbours: Coordinate[] = [];

        for (const dir of directions) {
            const newCoord: Coordinate = {
                x: coord.x + dir.x,
                y: coord.y + dir.y,
            };

            if (this.isWithinBounds(newCoord)) {
                neightbours.push(newCoord);
            }
        }
        return neightbours;
    }

}

