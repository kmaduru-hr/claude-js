
//Simple Min‑Heap Example (JS)
class MinHeap {
  constructor() {
    this.data = [];
  }

  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }

  swap(a, b) {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
  }

  push(value) {
    this.data.push(value);
    this.heapifyUp(this.data.length - 1);
  }

  heapifyUp(i) {
    while (i > 0 && this.data[i] < this.data[this.parent(i)]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  pop() {
    if (this.data.length === 0) return undefined;
    if (this.data.length === 1) return this.data.pop();

    const root = this.data[0];
    this.data[0] = this.data.pop();
    this.heapifyDown(0);
    return root;
  }

  heapifyDown(i) {
    let smallest = i;
    const left = this.left(i);
    const right = this.right(i);

    if (left < this.data.length && this.data[left] < this.data[smallest]) {
      smallest = left;
    }
    if (right < this.data.length && this.data[right] < this.data[smallest]) {
      smallest = right;
    }
    if (smallest !== i) {
      this.swap(i, smallest);
      this.heapifyDown(smallest);
    }
  }

/// kth smallest value

  function kthSmallest(arr, k) {
  const heap = new MaxHeap();
  for (let num of arr) {
    heap.push(num);
    if (heap.h.length > k) heap.pop();
  }
  return heap.top();
}

-----------------maxheap---------
  _up(i) {
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.h[p] >= this.h[i]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }

  _down(i) {
    const n = this.h.length;
    while (true) {
      let l = 2 * i + 1, r = 2 * i + 2, largest = i;
      if (l < n && this.h[l] > this.h[largest]) largest = l;
      if (r < n && this.h[r] > this.h[largest]) largest = r;
      if (largest === i) break;
      [this.h[i], this.h[largest]] = [this.h[largest], this.h[i]];
      i = largest;
    }

/// kth largest value ------------minHeap--------

  _up(i) {
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.h[p] <= this.h[i]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }

  _down(i) {
    const n = this.h.length;
    while (true) {
      let l = 2 * i + 1, r = 2 * i + 2, smallest = i;
      if (l < n && this.h[l] < this.h[smallest]) smallest = l;
      if (r < n && this.h[r] < this.h[smallest]) smallest = r;
      if (smallest === i) break;
      [this.h[i], this.h[smallest]] = [this.h[smallest], this.h[i]];
      i = smallest;
    }
}
// kth largest unsing array javascript

function kthlargest(nums, k){
let arr = [];

  for(num of nums){
    let i = arr.findIndex(x => x>k);
    if(i === -1) arr.push(num);
    else arr.splice(i,0,num);
  }

  if(arr.length > k){
    arr.shift();
  }
  return arr[0];
}
// kth smallest 

function 
    
