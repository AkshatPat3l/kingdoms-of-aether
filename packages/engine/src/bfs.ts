import { Coordinate } from "./types";
import { Grid } from "./grid";
import { Queue } from "./queue";

/**
 * Performs Breadth-First Search to find all tiles
 * reachable within a given movement range.
 *
 * Time Complexity:
 *   O(V + E)
 *
 * Space Complexity:
 *   O(V)
 */
export function bfsReachable(
    grid: Grid,
    start: Coordinate,
    maxDistance: number
): Coordinate[] {
    const visited = new Set<string>();
    const queue = new Queue<{ coord: Coordinate; distance: number }>();

    const reachable: Coordinate[] = [];

    queue.enqueue({ coord: start, distance: 0 });
    visited.add(key(start));
    while (!queue.isEmpty()) {
        const current = queue.dequeue();
        if (!current) continue;

        const { coord, distance } = current;

        //Stop exploring beyond maxDistance
        if (distance > maxDistance) continue;

        reachable.push(coord);

        for (const neighbour of grid.getNeighbours(coord)) {
            const neighbourKey = key(neighbour);

            if (!visited.has(neighbourKey)) {
                visited.add(neighbourKey);

                queue.enqueue({
                    coord: neighbour,
                    distance: distance + 1
                });
            }
        }
    }
    return reachable;
}

/**
 * Converts coordinate into a unique string key.
 * Needed for Set tracking.
 */
function key(coord: Coordinate): string {
    return `${coord.x},${coord.y}`;
}