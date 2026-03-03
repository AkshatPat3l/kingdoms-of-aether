/**
 * Union Find (Disjoint Set Union)
 *
 * Supports:
 * union(x,y)
 * find(x)
 *
 * Optimized with path compression and union by rank
 *
 * Time Complexity (Amortized): O(1)
 */

export class UnionFind {
  private parent: Map<string, string> = new Map();
  private rank: Map<String, number> = new Map();

  /**
   * Creates a new set for element if not exists
   */

  makeSet(x: string): void {
    if (!this.parent.has(x)) {
      this.parent.set(x, x);
      this.rank.set(x, 0);
    }
  }

  /**
   * Finds the root of the element with path compression
   */
  find(x: string): string {
    if (!this.parent.has(x)) {
      throw new Error(`Element ${x} not found`);
    }

    if (this.parent.get(x)! === x) {
      const root = this.find(this.parent.get(x)!);
      this.parent.set(x, root);
    }

    return this.parent.get(x)!;
  }

  /**
   * Merges two sets by using union by rank
   */

  union(x: string, y: string): void {
    this.makeSet(x);
    this.makeSet(y);

    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return;

    const rankX = this.rank.get(rootX)!;
    const rankY = this.rank.get(rootY)!;

    if (rankX < rankY) {
      this.parent.set(rootX, rootY);
    } else if (rankX > rankY) {
      this.parent.set(rootY, rootX);
    } else {
      this.parent.set(rootY, rootX);
      this.rank.set(rootX, rankX + 1);
    }
  }

  /**
   * Checks if two elements belong to the same set
   */

  connected(x: string, y: string): boolean {
    return this.find(x) === this.find(y);
  }
}
