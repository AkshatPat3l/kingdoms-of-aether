import { GameState, Turn } from "../core";
/**
 * Simple evalulation
 * Sum of player health - sum of enemy health
 */

export function evaluate(state: GameState, perspective: Turn): number {
  let perspectiveScore = 0;
  let opponentScore = 0;

  for (const unit of state.units) {
    if (unit.owner === perspective) {
      perspectiveScore += unit.health;
    } else {
      opponentScore += unit.health;
    }
  }

  return perspectiveScore - opponentScore;
}
