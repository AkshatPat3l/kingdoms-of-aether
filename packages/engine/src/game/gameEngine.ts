import { GameState, Turn, Coordinate } from "../core/types";
import { Grid } from "../core/grid";
import { bfsReachable } from "../pathfinding/bfs";
import { minimax } from "../ai/minimax";
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
      grid: this.grid,
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

    if (unit.owner !== this.state.currentTurn) {
      throw new Error("Not this unit's turn");
    }

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

    const targetUnit = this.state.units.find(
      (u) => u.position.x === newPosition.x && u.position.y === newPosition.y,
    );

    if (targetUnit) {
      if (targetUnit.owner === unit.owner) {
        throw new Error("Invalid move: tile occupied by ally");
      }

      // ----- Combat -----

      // Attacker hits first
      targetUnit.health -= unit.attack;

      // If defender survives → counterattack
      if (targetUnit.health > 0) {
        unit.health -= targetUnit.attack;
      }

      // Handle deaths

      const attackerDead = unit.health <= 0;
      const defenderDead = targetUnit.health <= 0;

      if (attackerDead && defenderDead) {
        // Remove both
        this.state.units = this.state.units.filter(
          (u) => u.id !== unit.id && u.id !== targetUnit.id,
        );
        return;
      }

      if (defenderDead) {
        // Remove defender
        this.state.units = this.state.units.filter(
          (u) => u.id !== targetUnit.id,
        );

        // Attacker survives → move into tile
        unit.position = newPosition;
        return;
      }

      if (attackerDead) {
        // Remove attacker
        this.state.units = this.state.units.filter((u) => u.id !== unit.id);
        return;
      }

      // Both survive → no movement
      return;
    }

    // Empty tile → normal movement
    unit.position = newPosition;
  }
  /**
   * Ends current turn and switches palyer
   */

  endTurn(): void {
    this.state.currentTurn =
      this.state.currentTurn === Turn.PLAYER ? Turn.AI : Turn.PLAYER;

    this.state.turnNumber += 1;
  }

  /**
   * Returns whose turn it is
   */
  getCurrentTurn(): Turn {
    return this.state.currentTurn;
  }

  makeAIMove(depth: number): void {
    // Ensure it is AI's turn
    if (this.state.currentTurn !== Turn.AI) {
      throw new Error("It is not AI's turn");
    }

    // Clone state to protect engine from accidental mutation
    const stateSnapshot = structuredClone(this.state);

    // Run minimax from AI perspective
    const result = minimax(stateSnapshot, depth, Turn.AI);

    if (!result.move) {
      console.log("AI has no valid moves");
      this.endTurn();
      return;
    }

    // Apply authoritative move through engine mutation method
    this.moveUnit(result.move.unitId, result.move.target);

    // End AI turn
    this.endTurn();
  }
}
