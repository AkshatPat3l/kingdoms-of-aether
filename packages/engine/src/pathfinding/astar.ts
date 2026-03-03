import { Coordinate, TerrainType } from "../core/types";
import { Grid } from "../core/grid";
import { MinHeap } from "../pathfinding/minHeap";

/**
 * A* pathfinding algorithm
 *
 * Time Complexity: O(V+E) log V)
 *
 * In practice faster than  Djikstra
 * due to heuristic guidance
 */

export function astar(
  grid: Grid,
  start: Coordinate,
  goal: Coordinate,
): Coordinate[] | null {
  const openSet = new MinHeap<Coordinate>();
  const cameFrom = new Map<string, Coordinate>();
  const gScore = new Map<string, number>();

  const startKey = key(start);

  gScore.set(startKey, 0);
  openSet.insert(start, heuristic(start, goal));

  while (openSet.size() > 0) {
    const current = openSet.extractMin();
    if (!current) continue;

    if (current.x === goal.x && current.y === goal.y) {
      return reconstructPath(cameFrom, current);
    }

    const currentKey = key(current);
    const currentG = gScore.get(currentKey)!;

    for (const neighbour of grid.getNeighbours(current)) {
      const neighbourKey = key(neighbour);

      const tentativeG =
        currentG + terrainCost(grid.tiles[neighbour.y][neighbour.x].terrain);

      if (!gScore.has(neighbourKey) || tentativeG < gScore.get(neighbourKey)!) {
        cameFrom.set(neighbourKey, current);
        gScore.set(neighbourKey, tentativeG);

        const fScore = tentativeG + heuristic(neighbour, goal);
        openSet.insert(neighbour, fScore);
      }
    }
  }

  return null;
}

/**
 * Manhattan distance heuristic
 */

function heuristic(a: Coordinate, b: Coordinate): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function terrainCost(type: TerrainType): number {
  switch (type) {
    case TerrainType.PLAIN:
      return 1;
    case TerrainType.FOREST:
      return 2;
    case TerrainType.MOUNTAIN:
      return 5;
    default:
      return 1;
  }
}

function key(coord: Coordinate): string {
  return `${coord.x},${coord.y}`;
}

function reconstructPath(
  cameFrom: Map<string, Coordinate>,
  current: Coordinate,
): Coordinate[] {
  const path: Coordinate[] = [current];

  while (cameFrom.has(key(current))) {
    current = cameFrom.get(key(current))!;
    path.push(current);
  }

  return path.reverse();
}
