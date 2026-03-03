import { GameState, Unit } from "../core";
import { Move } from "./moveGenerator";

/**
 * Deep clones the GameState
 * Uses structuredClone (Node 17+ / modern runtime)
 */

function cloneState(state: GameState): GameState {
  return structuredClone(state);
}

/**
 * Pure version of move application
 * Does not mutate original state
 */

export function simulateMove(state: GameState, move: Move): GameState {
  const newState = cloneState(state);

  const unit = newState.units.find((u: Unit) => u.id === move.unitId);

  if (!unit) {
    throw new Error("Unit not found during simulation");
  }

  const targetUnit = newState.units.find(
    (u: Unit) =>
      u.position.x === move.target.x && u.position.y === move.target.y,
  );

  //If enemy present => COMBAT
  if (targetUnit && targetUnit.owner != unit.owner) {
    //Attacker hits
    targetUnit.health -= unit.attack;

    //Counterattack if defender survives
    if (targetUnit.health > 0) {
      unit.health -= targetUnit.attack;
    }

    const attackerDead = unit.health <= 0;
    const defenderDead = targetUnit.health <= 0;

    if (attackerDead && defenderDead) {
      newState.units = newState.units.filter(
        (u: Unit) => u.id !== unit.id && u.id !== targetUnit.id,
      );
      return newState;
    }

    if (defenderDead) {
      newState.units = newState.units.filter(
        (u: Unit) => u.id !== targetUnit.id,
      );
      unit.position = move.target;
      return newState;
    }

    if (attackerDead) {
      newState.units = newState.units.filter((u: Unit) => u.id !== unit.id);
      return newState;
    }

    //Empty tile => normal movement
    unit.position = move.target;

    return newState;
  }

  return newState;
}
