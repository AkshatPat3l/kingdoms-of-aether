import { GameState, Turn } from "../core/types";
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
  perspective: Turn,
  alpha: number = -Infinity,
  beta: number = Infinity,
): MinimaxResult {
  if (depth === 0) {
    return { score: evaluate(state, perspective), move: null };
  }

  const moves = generateLegalMoves(state);

  if (moves.length === 0) {
    return { score: evaluate(state, perspective), move: null };
  }

  const maximizing = state.currentTurn === perspective;
  let bestMove: Move | null = null;

  if (maximizing) {
    let maxEval = -Infinity;

    for (const move of moves) {
      const newState = simulateMove(state, move);
      const result = minimax(newState, depth - 1, perspective, alpha, beta);

      if (result.score > maxEval) {
        maxEval = result.score;
        bestMove = move;
      }

      alpha = Math.max(alpha, maxEval);

      // 🔥 PRUNE
      if (beta <= alpha) {
        break;
      }
    }

    return { score: maxEval, move: bestMove };
  } else {
    let minEval = Infinity;

    for (const move of moves) {
      const newState = simulateMove(state, move);
      const result = minimax(newState, depth - 1, perspective, alpha, beta);

      if (result.score < minEval) {
        minEval = result.score;
        bestMove = move;
      }

      beta = Math.min(beta, minEval);

      // 🔥 PRUNE
      if (beta <= alpha) {
        break;
      }
    }

    return { score: minEval, move: bestMove };
  }
}
