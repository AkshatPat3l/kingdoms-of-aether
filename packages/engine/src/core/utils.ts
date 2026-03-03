import { Coordinate } from "./types";

/**
 * Converts coordinate into unique string key.
 */
export function key(coord: Coordinate): string {
  return `${coord.x},${coord.y}`;
}
