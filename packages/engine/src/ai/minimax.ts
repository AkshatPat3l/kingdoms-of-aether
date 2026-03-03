import { GameState } from "../core/types";
import { generateLegalMoves, Move } from "../game/moveGenerator";
import { simulateMove } from "../game/simulateMove";
import { evaluate } from "./evaluate";

export interface MinimaxResult {
  score: number;
  move: Move | null;
}

export function minimax(
  state: GameState,
  depth: number,
  maximizing: boolean,
): MinimaxResult {
  if (depth === 0) {
    return { score: evaluate(state), move: null };
  }

  const moves = generateLegalMoves(state);

  if (moves.length === 0) {
    return { score: evaluate(state), move: null };
  }

  let bestMove: Move | null = null;

  if (maximizing) {
    let maxEval = -Infinity;

    for (const move of moves) {
      const newState = simulateMove(state, move);
      const result = minimax(newState, depth - 1, false);

      if (result.score > maxEval) {
        maxEval = result.score;
        bestMove = move;
      }
    }

    return { score: maxEval, move: bestMove };
  } else {
    let minEval = Infinity;

    for (const move of moves) {
      const newState = simulateMove(state, move);
      const result = minimax(newState, depth - 1, true);

      if (result.score < minEval) {
        minEval = result.score;
        bestMove = move;
      }
    }

    return { score: minEval, move: bestMove };
  }
}
