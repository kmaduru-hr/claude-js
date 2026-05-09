// DFS Template (Memorize This)
// This is the universal DFS template for trees, graphs, grids.

function dfs(node){
  if(!node || visites.has(node)) return;

  visited.add(node);

  for(let nei of graph[node]){
    dfs(nei);
  }
}  

/*
DFS on TREES (Easiest Form)
When to use

If the problem says:

    “preorder / inorder / postorder”

    “max depth”

    “path sum”

    “diameter”

    “count nodes”

→ Use DFS.
*/

fuction maxDep(root){
  if(!root) return 0;
  return 1+ Math.max((maxDep(root.left), maxDep(root.right));
}

/*
DFS on GRAPHS (Adjacency List)
When to use

If the problem says:

    “connected components”

    “is there a path”

    “cycle detection”

    “graph traversal”

→ Use DFS.*/
// Count connected components

function cntComp(n , edges){
  const graph = {};
  for(let i=0; i<n; i++) grapgh[i] = [];

  for(let [u,v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  const visited =new Set();
  let count = 0;

  function dfs(node){
    if(visited.has(node)) return;
       visited.add(node);
    for(let nei of graph[node]) dfs(nei);
  }
  
  for(let i = 0; i<n; i++){
      if(!visited.has(i)){
        count++;
        dfs)i);
      }
  }
  return count;
}
/*
DFS on GRIDS (Matrix DFS)
This is the most important DFS category for interviews.
Used in:
    Number of Islands ,Flood Fill  Surrounded Regions ,Max Area of Island,Count Closed Islands
*/
function numIslands(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols) return;
        if (grid[r][c] === '0') return;

        grid[r][c] = '0'; // mark visited

        dfs(r+1, c);
        dfs(r-1, c);
        dfs(r, c+1);
        dfs(r, c-1);
    }
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}

/* 
DFS for BACKTRACKING (Permutations, Subsets, Combinations)
When to use
If the problem says:
    “generate all”,“permutations”,“subsets”,“combinations”,“paths”
→ Use DFS + backtracking.
*/

function subsets(nums) {
    const res = [];

    function dfs(i, path) {
        if (i === nums.length) {
            res.push([...path]);
            return;
        }

        // include
        path.push(nums[i]);
        dfs(i + 1, path);

        // exclude
        path.pop();
        dfs(i + 1, path);
    }

    dfs(0, []);
    return res;
}

/*
DFS for PATH PROBLEMS

Used in:
    Path Sum,All Paths From Source to Target,Word Search,Maze problems
*/
function allPathsSourceTarget(graph) {
    const res = [];
    const target = graph.length - 1;

    function dfs(node, path) {
        if (node === target) {
            res.push([...path]);
            return;
        }

        for (let nei of graph[node]) {
            path.push(nei);
            dfs(nei, path);
            path.pop();
        }
    }

    dfs(0, [0]);
    return res;
}

