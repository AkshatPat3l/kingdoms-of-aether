import { GameState } from "../core";
/**
 * Simple evalulation
 * Sum of player health - sum of enemy health
 */

export function evaluate(state: GameState): number {
  let playerScore = 0;
  let enemyScore = 0;

  for (const unit of state.units) {
    if (unit.owner === state.currentTurn) {
      playerScore += unit.health;
    } else {
      enemyScore += unit.health;
    }
  }

  return playerScore - enemyScore;
}
