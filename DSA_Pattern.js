/* Sliding Window — Strings & Arrays 
Use when:  
You see substring, subarray, longest, smallest, at most K, distinct, frequency.
Problems:  
Longest substring without repeat, Minimum window substring, Fruits into baskets.
  -- str = 'abcabcbbdce'
*/

let left = 0;
const freq = new Map();

  for(let right = 0; right < s.length; right++){
    // expnad the window here

    freq.set(s[right], (freq.get(s[right]) || 0) + 1);
  
    while ( condition_not_met){
      //shrink window
          freq.set(s[left], freq.get(s[left]) -1);
          left++;
    }
      //update answer
  }

/*
 Two Pointers — Sorted arrays, linked lists
 Use when:  
   You should use while sorted, pair sum, remove duplicates, reverse, palindrome.
*/

let left = 0, right = arr.length - 1;

while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
}
/*
Prefix Sum — Range queries, subarray sums
Use when:  
  You see sum of subarray, range, k sum, count subarrays, num of ways, diff of sum,continous array.
  Note : Prefix sum converts subarray sum problems into O(1) lookups using cumulative sums and a hashmap.
*/

let sum = 0;
const map = new Map([[0, 1]]);
let count = 0;

for (let num of nums) {
    sum += num;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
}
    --------------------Sub Probelmes-------sum from i to j------------------
      const prefix = Array(n).fill(0);
      prefix[0] = nums[0];
      
      for (let i = 1; i < n; i++) {
          prefix[i] = prefix[i - 1] + nums[i];
      }
      
      // range sum l..r
      function rangeSum(l, r) {
          if (l === 0) return prefix[r];
          return prefix[r] - prefix[l - 1];
      }
 --------------------Continuous Subarray Sum----Prefix Sum + Modulo---------------------
      function checkSubarraySum(nums, k) {
        const map = new Map();
        map.set(0, -1); // remainder 0 seen at index -1
    
        let sum = 0;
    
          for (let i = 0; i < nums.length; i++) {
              sum += nums[i];
              const rem = sum % k;
      
              if (map.has(rem)) {
                  if (i - map.get(rem) >= 2) return true;
              } else {
                  map.set(rem, i);
              }
            }
        
              return false;
          }

/*
HashMap Frequency — Strings, anagrams, counting
Use when:  
   You see anagram, frequency, count, group.
*/
const freq = new Map();
for (let c of s) freq.set(c, (freq.get(c) || 0) + 1);

/*
Binary Search — Sorted, monotonic, answer search
Use when:  
  You see sorted, minimize/maximize, first/last occurrence, search space.
*/
let l = 0, r = n - 1;
while (l <= r) {
    const mid = (l + r) >> 1;
    if (condition(mid)) r = mid - 1;
    else l = mid + 1;
}

/*
DFS — Trees, graphs, recursion
Use when:  
  You see connected components, islands, tree traversal, backtracking.
*/

function dfs(node) {
    if (!node || visited.has(node)) return;
    visited.add(node);

    for (let nei of graph[node]) dfs(nei);
}
/*
BFS — Shortest path, levels

Use when:  
  You see shortest path, minimum steps, level order, 01 matrix.
*/

const q = [start];
const visited = new Set([start]);

while (q.length) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
        const node = q.shift();
        for (let nei of graph[node]) {
            if (!visited.has(nei)) {
                visited.add(nei);
                q.push(nei);
            }
        }
    }
}

/*

Backtracking — Permutations, subsets, combinations

Use when:  
  You see generate all, permutations, subsets, combinations.
*/
function backtrack(path, start) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
        path.push(nums[i]);
        backtrack(path, i + 1);
        path.pop();
    }
}
/*
Dynamic Programming — Optimal substructure

Use when:  
  You see min cost, max profit, ways, paths, dp[i][j].
*/
const dp = Array(n).fill(0);
for (let i = 1; i < n; i++) {
    dp[i] = Math.min(dp[i-1], dp[i-2]) + cost[i];
}



