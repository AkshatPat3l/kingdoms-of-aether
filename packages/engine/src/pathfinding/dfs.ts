import { Coordinate } from "../core/types";
import { Grid } from "../core/grid";
import { Stack } from "../core/stack";

/**
 * Performs Depth-First Search.
 * Explores as deep as possible before backtracking.
 *
 * Time Complexity:
 * O(V+E)
 *
 * Space Complexity:
 * O(V)
 */

export function dfs(grid: Grid, start: Coordinate): Coordinate[] {
  const visited = new Set<string>();
  const stack = new Stack<Coordinate>();
  const result: Coordinate[] = [];

  stack.push(start);

  while (!stack.isEmpty()) {
    const current = stack.pop();
    if (!current) continue;

    const currentKey = key(current);

    if (visited.has(currentKey)) continue;

    visited.add(currentKey);
    result.push(current);

    for (const neighbour of grid.getNeighbours(current)) {
      stack.push(neighbour);
    }
  }

  return result;
}

function key(coord: Coordinate): string {
  return `${coord.x},${coord.y}`;
}
