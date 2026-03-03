import { GameState } from "../core/types";
import { generateLegalMoves, Move } from "../game/moveGenerator";
import { simulateMove } from "../game/simulateMove";
import { evaluate } from "./evaluate";

export function minimax(
  state: GameState,
  depth: number,
  maximizing: boolean,
): number {
  if (depth === 0) {
    return evaluate(state);
  }

  const moves = generateLegalMoves(state);

  if (moves.length === 0) {
    return evaluate(state);
  }

  if (maximizing) {
    let maxEval = -Infinity;

    for (const move of moves) {
      const newState = simulateMove(state, move);
      const evalScore = minimax(newState, depth - 1, false);
      maxEval = Math.max(maxEval, evalScore);
    }
    return maxEval;
  } else {
    let minEval = Infinity;

    for (const move of moves) {
      const newState = simulateMove(state, move);
      const evalScore = minimax(newState, depth - 1, true);
      minEval = Math.min(minEval, evalScore);
    }
    return minEval;
  }
}
