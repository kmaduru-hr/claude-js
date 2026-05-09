// DFS Template (Memorize This)
// This is the universal DFS template for trees, graphs, grids.

function dfs(node){
  if(!node || visites.has(node)) return;

  visited.add(node);

  for(let nei of graph[node]){
    dfs(nei);
  }
}  

