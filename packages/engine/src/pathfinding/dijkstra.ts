import { Coordinate, TerrainType } from "../core/types";
import { Grid } from "../core/grid";
import { MinHeap } from "../pathfinding/minHeap";

/**
 * Dijkstra's Algorithm
 *
 * Finds the shortest path from start to all reachable nodes.
 *
 * Time Complexity: O(E log V)
 *
 * Space Complexity: O(V)
 *
 */

export function dijkstra(grid: Grid, start: Coordinate): Map<string, number> {
  const distances = new Map<string, number>();
  const heap = new MinHeap<Coordinate>();

  const startKey = key(start);

  //Initialize all distances as Infinity
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      distances.set(`${x}, ${y}`, Infinity);
    }
  }

  distances.set(startKey, 0);
  heap.insert(start, 0);

  while (heap.size() > 0) {
    const current = heap.extractMin();
    if (!current) continue;

    const currentKey = key(current);
    const currentDistance = distances.get(currentKey)!;

    for (const neighbour of grid.getNeighbours(current)) {
      const neighbourKey = key(neighbour);

      const cost = terrainCost(grid.tiles[neighbour.y][neighbour.x].terrain);

      const newDistance = currentDistance + cost;

      if (newDistance < distances.get(neighbourKey)!) {
        distances.set(neighbourKey, newDistance);
        heap.insert(neighbour, newDistance);
      }
    }
  }

  return distances;
}

/**
 *  Returns movement cost based on terrain
 */

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

function key(c: Coordinate): string {
  return `${c.x}, ${c.y}`;
}
