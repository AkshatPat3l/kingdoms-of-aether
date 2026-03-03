import { GameState, Turn, Coordinate } from "./types";
import { Grid } from "./grid";
import { bfsReachable } from "./bfs";
import { key as coordkey } from "./utils";
/**
 * GameEngine
 *
 * Controls turn flow and state transitions
 *
 * This ensures all game mutations happen in one place
 */

export class GameEngine {
  private state: GameState;
  private grid: Grid;
  constructor(width: number, height: number) {
    this.grid = new Grid(width, height);
    this.state = {
      width,
      height,
      tiles: this.grid.tiles,
      units: [],
      currentTurn: Turn.PLAYER,
      turnNumber: 1,
    };
  }

  /**
   * Returns current immutable state
   */

  getState(): GameState {
    return this.state;
  }

  /**
   * Adds a unit to the game
   */

  addUnit(unit: GameState["units"][number]): void {
    this.state.units.push(unit);
  }

  /**
   * Moves a unit to a position
   * Does not validate legality yet
   */

  moveUnit(unitId: string, newPosition: Coordinate): void {
    const unit = this.state.units.find((u) => u.id === unitId);

    if (!unit) {
      throw new Error("Unit not found");
    }

    // Ensure correct turn
    if (unit.owner !== this.state.currentTurn) {
      throw new Error("Not this unit's turn");
    }

    // Prevent stacking (no two units on same tile)
    const occupied = this.state.units.some(
      (u) =>
        u.id !== unitId &&
        u.position.x === newPosition.x &&
        u.position.y === newPosition.y,
    );

    if (occupied) {
      throw new Error("Invalid move: tile is occupied");
    }

    // Validate movement range using BFS
    const reachable = bfsReachable(
      this.grid,
      unit.position,
      unit.movementRange,
    );

    const isReachable = reachable.some(
      (r) => r.x === newPosition.x && r.y === newPosition.y,
    );

    if (!isReachable) {
      throw new Error("Invalid move: out of range");
    }

    // Apply move
    unit.position = newPosition;
  }
  /**
   * Ends current turn and switches palyer
   */

  endTurn(): void {
    this.state.currentTurn === Turn.PLAYER ? Turn.AI : Turn.PLAYER;

    this.state.turnNumber += 1;
  }

  /**
   * Returns whose turn it is
   */
  getCurrentTurn(): Turn {
    return this.state.currentTurn;
  }
}
