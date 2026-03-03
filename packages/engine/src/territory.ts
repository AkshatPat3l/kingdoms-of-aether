import { Grid } from "./grid";
import { UnionFind } from "./unionFind";
import { Coordinate } from "./types";

/**
 * Territory detection using Union-Find
 *
 * Groups connected tiles owned by same player
 *
 *
 * Time Complexity: o(V a(V)~nearly O(V))
 */

export function computeTerritories(grid: Grid) {
  const uf = new UnionFind();

  const ownerMap = new Map<string, string>(); // key -> owner

  //Step 1: Initialize sets for owned tiles
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; y++) {
      const tile = grid.tiles[y][x];

      if (tile.owner) {
        const tileKey = key(tile.position);
        uf.makeSet(tileKey);
        ownerMap.set(tileKey, tile.owner);
      }
    }
  }

  //Step 2: Union adjacent same-owner tiles

  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const tile = grid.tiles[y][x];

      if (!tile.owner) continue;

      const tileKey = key(tile.position);

      for (const neighbour of grid.getNeighbours(tile.position)) {
        const neighbourTile = grid.tiles[neighbour.y][neighbour.x];

        if (neighbourTile.owner && neighbourTile.owner === tile.owner) {
          uf.union(tileKey, key(neighbour));
        }
      }
    }
  }

  //Step 3: Group tiles by root

  const territories = new Map<string, Coordinate[]>();

  for (const tileKey of ownerMap.keys()) {
    const root = uf.find(tileKey);

    if (!territories.has(root)) {
      territories.set(root, []);
    }

    const [x, y] = tileKey.split(",").map(Number);
    territories.get(root)!.push({ x, y });
  }

  return territories;
}

function key(c: Coordinate): string {
  return `${c.x},${c.y}`;
}
