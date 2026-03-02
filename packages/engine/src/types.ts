/**
 Represents a position  on the grid
 **/

export interface Coordinate {
    x: number;
    y: number;
}


/**
 * Different Terrain Types.
 * Terrain affects movement cost.
 */

export enum TerrainType {
    PLAIN = "PLAIN",
    FOREST = "FOREST",
    MOUNTAIN = "MOUNTAIN",
}

/**
 * Represents a single tile on the grid.
 */

export interface Tile {
    position: Coordinate;
    terrain: TerrainType;
    owner: "PLAYER" | "AI" | null;
}

/*
 *Represents whose turn it is
*/
export enum Turn {
    PLAYER = "PLAYER",
    AI = "AI",
}

/**
 * Represents a unit on the board.
 */
export interface Unit {
    id: string;
    position: Coordinate;
    hp: number;
    movementRange: number;
    owner: "PLAYER" | "AI";
}

/**
 * Represents the full game state.
 * This is the single source of truth for the engine.
 */
export interface GameState {
    width: number;
    height: number;
    tiles: Tile[][];
    units: Unit[];
    currentTurn: Turn;
    turnNumber: number;
}


