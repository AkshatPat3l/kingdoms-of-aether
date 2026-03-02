/** 
 * Queue Data Structure
 * 
 * Used for BFS traversal.
 * 
 * Why not use Array.shift()?
 * because shift() is O(n), it re-indexes the entire array
 * 
 * This implementation uses a head pointer to achieve O(1)
 * enqueue and dequeue operations.
 * 
 * Time Complexity:
 * - enqueue: O(1)
 * - dequeue: O(1)
 * 
 * Space Complexity:
 * O(n)
*/

export class Queue<T> {
    private items: T[] = [];
    private head: number = 0;

    /** 
     * Adds an element to the abck of the queue
     */
    enqueue(item: T): void {
        this.items.push(item);
    }

    /**
     * Removes and returns the front element
     */

    dequeue(): T | undefined {

        if (this.isEmpty()) {
            return undefined;
        }

        const item = this.items[this.head];
        this.head++;
        return item;

    }


    /**
     * Returns true if is empty
     */
    isEmpty(): boolean {
        return this.head >= this.items.length;
    }

    /**
    * Returns current number of elements
    */
    size(): number {
        return this.items.length - this.head;
    }

}
