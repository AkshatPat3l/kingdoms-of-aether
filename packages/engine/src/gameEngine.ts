import { GameState, Turn, Coordinate } from "./types";
import { Grid } from "./grid";

/**
 * GameEngine
 *
 * Controls turn flow and state transitions
 *
 * This ensures all game mutations happen in one place
 */

export class GameEngine {
  private state: GameState;

  constructor(width: number, height: number) {
    const grid = new Grid(width, height);
    this.state = {
      width,
      height,
      tiles: grid.tiles,
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
