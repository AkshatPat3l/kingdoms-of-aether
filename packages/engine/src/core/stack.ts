/**
 * Stack Data Structure
 * 
 * Used for DFS traversal
 * 
 * LIFO: Last In, First Out
 * 
 * Time Complexity:
 *  push: O(1)
 *  pop:  O(1)
 * 
 * 
 * Space Complexity:
 *  O(n)
 */

export class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item)
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

}