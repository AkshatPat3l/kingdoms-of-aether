/**
 * Binary Min Heap
 * 
 * maintains the smallest element at the root
 * 
 * Time Complexity:
 * insert: O(log n)
 * extractMin: O(log n)
 * peek: O(1)
 * 
 * 
 */

export class MinHeap<T> {
    private heap: { value: T, priority: number }[] = [];

    /**
     * Returns number of elements
     */

    size(): number {
        return this.heap.length;

    }

    /**
     * Returns smallest element without removing it
     */
    peek(): T | undefined {
        return this.heap[0]?.value;
    }

    /**
     * Inserts new element
     */

    insert(value: T, priority: number): void {
        this.heap.push({ value, priority });
        this.bubbleUp();
    }

    /**
     * Removes and returns the smallest element
     */

    extractMin(): T | undefined {
        if (this.heap.length === 0) return undefined;

        const min = this.heap[0];
        const end = this.heap.pop();

        if (this.heap.length > 0 && end) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return min.value;
    }

    /**
     * Restores heap property upward
     */

    private bubbleUp(): void {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[index].priority >= this.heap[parentIndex].priority) {
                break;
            }

            this.swap(index, parentIndex);

            index = parentIndex;
        }
    }


    /**
     * Restores heap property downward
     */

    private bubbleDown(): void {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let smallest = index;

            if (
                left < length &&
                this.heap[left].priority < this.heap[smallest].priority
            ) {
                smallest = left;
            }

            if (right < length &&
                this.heap[right].priority < this.heap[smallest].priority
            ) {
                smallest = right;
            }


            if (smallest === index) break;

            this.swap(index, smallest);
            index = smallest;
        }
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}