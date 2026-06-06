//*** 
function isPalindrome(s) {
  let i = 0;
  let j = s.length - 1;

  while (i < j) {
    // Skip non-alphanumeric if needed
    while (i < j && !isAlphaNum(s[i])) i++;
    while (i < j && !isAlphaNum(s[j])) j--;

    if (s[i].toLowerCase() !== s[j].toLowerCase()) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}

function isAlphaNum(ch) {
  const code = ch.charCodeAt(0);
  const isDigit = code >= 48 && code <= 57;
  const isUpper = code >= 65 && code <= 90;
  const isLower = code >= 97 && code <= 122;
  return isDigit || isUpper || isLower;
}
//***
function maxSumSubarraySizeK(nums, k) {
  const n = nums.length;
  if (k <= 0 || k > n) return 0;

  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  let maxSum = windowSum;

  for (let i = k; i < n; i++) {
    windowSum += nums[i] - nums[i - k];
    if (windowSum > maxSum) {
      maxSum = windowSum;
    }
  }

  return maxSum;
}
//***
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}

//**
function lengthOfLongestSubstring(s) {
  const lastIndex = new Map();
  let start = 0;
  let maxLen = 0;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (lastIndex.has(ch) && lastIndex.get(ch) >= start) {
      start = lastIndex.get(ch) + 1;
    }
    lastIndex.set(ch, i);
    maxLen = Math.max(maxLen, i - start + 1);
  }

  return maxLen;
}
//***
function twoSum(nums, target) {
  const map = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const needed = target - num;
    if (map.has(needed)) {
      return [map.get(needed), i];
    }
    map.set(num, i);
  }
  return []; // or null if no solution
}

//** • Word Break (DP + backtracking).

function wordBreak(s, wordDict) {
    const n = s.length;
    const wordSet = new Set(wordDict);

    // ---------- DP: mark valid breakpoints ----------
    const dp = Array(n + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    if (!dp[n]) return []; // no valid segmentation

    // ---------- DFS + Memo ----------
    const memo = new Map();

    function dfs(start) {
        if (memo.has(start)) return memo.get(start);
        if (start === n) return [""];

        const result = [];

        for (let end = start + 1; end <= n; end++) {
            const word = s.substring(start, end);

            if (wordSet.has(word) && dp[end]) {
                const subs = dfs(end);
                for (const sub of subs) {
                    result.push(sub === "" ? word : word + " " + sub);
                }
            }
        }

        memo.set(start, result);
        return result;
    }

    return dfs(0);
}
//**
function solveNQueens(n) {
    const result = [];
    const board = Array.from({ length: n }, () => ".".repeat(n));

    const cols = new Set();
    const diag1 = new Set(); // row - col
    const diag2 = new Set(); // row + col

    function backtrack(row) {
        if (row === n) {
            result.push([...board]);
            return;
        }

        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }

            // place queen
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            const rowArr = board[row].split("");
            rowArr[col] = "Q";
            board[row] = rowArr.join("");

            backtrack(row + 1);

            // remove queen (backtrack)
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
            rowArr[col] = ".";
            board[row] = rowArr.join("");
        }
    }

    backtrack(0);
    return result;
}
//**
//water trap Input: height = [4,2,0,3,2,5] Output: 9

var trap = function(height) {
    let l = 0;
    let r = height.length - 1;
    let lmax = 0;
    let rmax = 0;
    let water = 0;
    while (l < r) {
        lmax= Math.max(lmax,height[l]);
        rmax = Math.max(rmax,height[r]);
        if(lmax < rmax){
            water += lmax - height[l];
            l++;
        }else{
            water += rmax - height[r];
            r--;
        }
    }
    return water;
};
//**

//matrix of trap water

class MinHeap {
  constructor() {
    this.data = [];
  }

  _swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  _parent(i) {
    return Math.floor((i - 1) / 2);
  }

  _left(i) {
    return 2 * i + 1;
  }

  _right(i) {
    return 2 * i + 2;
  }

  push(item) {
    this.data.push(item);
    this._heapifyUp(this.data.length - 1);
  }

  _heapifyUp(i) {
    while (i > 0) {
      const p = this._parent(i);
      if (this.data[p][0] <= this.data[i][0]) break; // compare by height
      this._swap(p, i);
      i = p;
    }
  }

  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._heapifyDown(0);
    }
    return top;
  }

  _heapifyDown(i) {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const l = this._left(i);
      const r = this._right(i);

      if (l < n && this.data[l][0] < this.data[smallest][0]) {
        smallest = l;
      }
      if (r < n && this.data[r][0] < this.data[smallest][0]) {
        smallest = r;
      }
      if (smallest === i) break;
      this._swap(i, smallest);
      i = smallest;
    }
  }

  isEmpty() {
    return this.data.length === 0;
  }
}

/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {
  const m = heightMap.length;
  if (m === 0) return 0;
  const n = heightMap[0].length;
  if (m < 3 || n < 3) return 0; // cannot trap

  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  const heap = new MinHeap();

  // Push all boundary cells into heap
  for (let i = 0; i < m; i++) {
    // left boundary
    heap.push([heightMap[i][0], i, 0]);
    visited[i][0] = true;
    // right boundary
    heap.push([heightMap[i][n - 1], i, n - 1]);
    visited[i][n - 1] = true;
  }

  for (let j = 1; j < n - 1; j++) {
    // top boundary
    heap.push([heightMap[0][j], 0, j]);
    visited[0][j] = true;
    // bottom boundary
    heap.push([heightMap[m - 1][j], m - 1, j]);
    visited[m - 1][j] = true;
  }

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let water = 0;

  while (!heap.isEmpty()) {
    const [h, i, j] = heap.pop();

    for (const [di, dj] of dirs) {
      const ni = i + di;
      const nj = j + dj;

      if (ni < 0 || ni >= m || nj < 0 || nj >= n || visited[ni][nj]) continue;

      visited[ni][nj] = true;

      const nh = heightMap[ni][nj];

      if (nh < h) {
        water += h - nh; // trapped water
        heap.push([h, ni, nj]); // water raises this cell to height h
      } else {
        heap.push([nh, ni, nj]);
      }
    }
  }

  return water;
};





