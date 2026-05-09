/*
What BFS really is
BFS = Breadth‑First Search → explore level by level.

Use BFS when you see: “shortest path”,“minimum steps”,“distance”,“level order”,“nearest”,“spread”,“flood”,“multi‑source expansion”

BFS is the only pattern that guarantees shortest path in an unweighted graph.
*/
//The Universal BFS Template

const q = [start];
const visited = new Set([start]);
while(q.length){
  const size = q.length;

  for(let i = 0; i < size; i++){
      const node = q.shift();
      for(let nei of graph[node]){
          if(!visited.has(nei)){
            visited.add(nei);
            q.push(nei);
          }
      }
  }
}
