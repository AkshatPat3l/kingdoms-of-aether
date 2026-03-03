import { GameState, Coordinate } from "../core/types";
import { bfsReachable } from "../pathfinding/bfs";

export interface Move {
  unitId: string;
  target: Coordinate;
}

/**
 * Generates all legal moves from current player
 * Does NOT mutate state.
 */

export function generateLegalMoves(state: GameState): Move[] {
  const grid = state.grid;

  const moves: Move[] = [];

  const currentUnits = state.units.filter((u) => u.owner === state.currentTurn);

  for (const unit of currentUnits) {
    const reachable = bfsReachable(grid, unit.position, unit.movementRange);

    for (const tile of reachable) {
      //Skip staying in place
      if (tile.x === unit.position.x && tile.y === unit.position.y) {
        continue;
      }

      //Check if ally occupies target tile
      const allyOnTile = state.units.find(
        (u) =>
          u.owner === unit.owner &&
          u.position.x === tile.x &&
          u.position.y === tile.y,
      );

      if (!allyOnTile) {
        moves.push({
          unitId: unit.id,
          target: tile,
        });
      }
    }
  }
  return moves;
}
