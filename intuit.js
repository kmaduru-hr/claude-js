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
