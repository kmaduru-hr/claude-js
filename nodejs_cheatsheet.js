Concise reference answers for the Node.js practice questions we discussed earlier.

---

## 1. Core Node.js basics

Q: What is Node.js and why is it single-threaded?
A: Node.js is a JavaScript runtime built on V8 that lets you run JS outside the browser, mainly on the server. "Single-threaded" describes its main execution model: it uses a single JavaScript thread with an event loop to handle many concurrent I/O operations without creating a thread per request.

Q: What is the role of libuv in Node.js?
A: libuv is a C library that provides the event loop and a thread pool for Node.js. It abstracts non-blocking I/O across operating systems and powers timers, file system operations, DNS, and more.

Q: What is the event loop, and how does Nodeâ€™s differ from the browserâ€™s?
A: The event loop is the mechanism that processes callbacks and async tasks in phases, letting Node.js handle many concurrent operations on one thread. Nodeâ€™s event loop includes additional phases and queues (like timers, I/O callbacks, check, close callbacks) and integrates with libuvâ€™s thread pool and system I/O; the browserâ€™s loop focuses on UI events, rendering, and Web APIs instead.

Q: Difference between process.nextTick, setImmediate, and setTimeout?
A: process.nextTick queues a callback to run immediately after the current JS stack, before any other I/O tasks. setImmediate queues a callback in the "check" phase, after I/O events. setTimeout schedules a callback to run after at least the given delay in the timers phase; itâ€™s affected by event-loop load and not precise.

Q: CommonJS vs ES modules in Node.js, and how to import fs?
A: CommonJS is the older module system using require/module.exports; ES modules use import/export syntax. In CommonJS you write: const fs = require('fs'); In an ES module: import * as fs from 'fs'; or import fs from 'fs'; depending on how you consume it.

Q: What are worker threads and when to use them?
A: Worker threads let you run JavaScript in parallel threads within the same process. Theyâ€™re useful for CPU-bound tasks (e.g., heavy computation, cryptography) that would otherwise block the event loop.

Q: What is the cluster module and why use it?
A: The cluster module lets you spawn multiple Node.js processes that share the same server port. It helps you use multiple CPU cores and improve throughput/fault tolerance for HTTP servers.

---

## 2. Asynchronous JS and Promises

Q: Explain callbacks, Promises, and async/await in Node.js.
A: Callbacks are functions passed into other functions to run later when an async operation completes (classic Node pattern is error-first callbacks). Promises wrap an async result and can be in pending, fulfilled, or rejected state, providing .then/.catch chaining. async/await is syntax on top of Promises that lets you write asynchronous code in a synchronous style by "awaiting" Promises.

Q: What is a Promise, and how does Promise.all work?
A: A Promise is an object representing the eventual result of an async operation. Promise.all takes an iterable of Promises and returns a new Promise that fulfills with an array of results when all input Promises fulfill, or rejects immediately if any input Promise rejects.

Q: High-level: how does Node handle async operations?
A: JavaScript code submits async work (like I/O) to libuv or other subsystems, which execute it in the background. When operations complete, callbacks or Promise resolutions are queued, and the event loop pulls them off queues and executes them in well-defined phases.

Q: Sketch: how would you implement a simple concurrency limiter for async tasks?
A: Keep a queue of pending tasks and a counter of running tasks. Start up to "limit" tasks immediately; when each finishes, decrement the counter and start the next task from the queue until all are done.

---

## 3. Express and REST APIs

Q: Typical Express server responsibilities in an assessment?
A: Set up an HTTP server, define REST routes (GET/POST/PUT/DELETE), parse JSON bodies, handle errors with middleware, and return appropriate status codes and responses. Often you also implement simple logging and basic validation.

Q: What does a logging middleware do?
A: A logging middleware runs on each request and records useful info such as method, URL, status code, and response time. It helps with debugging and monitoring.

Q: What does an error-handling middleware look like?
A: Itâ€™s a function with four arguments (err, req, res, next) that centralizes how you log errors and send HTTP error responses (like 400 or 500) instead of crashing the server.

Q: High-level approach to a simple rate limiter middleware?
A: Track requests per IP (or token) in memory (or a store) with timestamps. For each request, check if the count in the current window exceeds the limit; if it does, respond with 429 Too Many Requests; otherwise increment the count and call next().

Q: In a mock blog posts API, what should proper CRUD endpoints do?
A: POST /posts creates a new post and returns 201 with the new resource. GET /posts returns a list. GET /posts/:id returns a single post or 404. PUT/PATCH /posts/:id updates an existing post, and DELETE /posts/:id removes it and returns a success status.

---

## 4. Streams, fs, and events

Q: What are streams in Node.js and why use them?
A: Streams are objects for working with data piece by piece instead of loading everything into memory. They are efficient for large files or network data, because you can start processing data as it arrives and keep memory usage low.

Q: Main stream types?
A: Readable (data flows out), Writable (data flows in), Duplex (both readable and writable), and Transform (duplex streams that modify data passing through).

Q: How would you copy a file with streams?
A: Use fs.createReadStream(source).pipe(fs.createWriteStream(destination)); This reads the file chunk by chunk and writes it to the destination.

Q: What is EventEmitter and how do you use it?
A: EventEmitter is a core class that allows objects to emit named events and register listeners. You create a subclass or instance, use emitter.on('event', handler) to listen, and emitter.emit('event', data) to trigger handlers.

Q: For counting lines with "ERROR" using streams, whatâ€™s the general plan?
A: Create a readable stream from the file, split incoming data into lines (e.g., using readline or manual buffering), increment a counter when a line contains "ERROR", and log the total when the stream ends.

---

## 5. Error handling and performance

Q: Operational vs programmer errors in Node.js?
A: Operational errors are expected runtime problems like network timeouts, failed DB connections, or missing files, and you should handle them gracefully. Programmer errors are bugs in the code (like undefined variables or logic mistakes) and typically require fixing the code, often by crashing and restarting the process.

Q: How to handle errors in async/await and callbacks?
A: With async/await you wrap awaits in try/catch and handle or propagate the error. With callbacks you follow the error-first convention (callback(err, result)) and check if err is non-null before using the result.

Q: Strategies to avoid blocking the event loop?
A: Offload CPU-heavy work to worker threads or child processes, break large synchronous loops into smaller chunks with timers, use streaming instead of loading huge data into memory, and prefer non-blocking async APIs over sync ones (like fs.readFile instead of fs.readFileSync in a request handler).

Q: How would you debug or detect a memory leak in Node?
A: Use tools like the Node inspector and Chrome DevTools or Nodeâ€™s heap snapshots to monitor memory usage over time. You can also log process.memoryUsage() periodically, identify objects that grow unexpectedly, and use profiling to track down code paths that retain references.

Q: Clustering vs worker threads vs child processes?
A: Clustering runs multiple Node processes that share the same server port via a master process, mainly for scaling I/O-bound servers across cores. Worker threads run JS code in multiple threads within one process, suitable for CPU-bound tasks. Child processes spawn separate OS processes (not sharing memory by default), useful for running external programs or isolating tasks strongly.

Q: Which things block the event loop in the example question and why?
A: A long, synchronous for loop and heavy synchronous JSON parsing block the event loop because they run on the main JS thread until completion. Async fs.readFile does not block because it hands work to the OS/libuv and returns immediately.

---

## 6. Security and best practices

Q: Where to store sensitive config like DB passwords and API keys?
A: Put secrets in environment variables or a secrets manager, not in source code. Load them at runtime using process.env or a small config layer.

Q: How to load secrets safely in Node.js code?
A: Read them from process.env (often with dotenv in local development) and pass them into library configuration (like DB clients) rather than hard-coding them. Restrict access and avoid logging them.

Q: Basic idea of JWT authentication in Node/Express?
A: On login, the server signs a token (JWT) with a secret containing user claims and sends it to the client. On each request requiring auth, the client sends the token (usually in the Authorization header), and the server verifies the signature and extracts the claims before allowing access.

Q: When is CSRF protection needed for APIs?
A: CSRF mainly affects browser-based requests that automatically include cookies. A pure token-based API used by non-browser clients is less vulnerable; if you rely on cookies for auth from a browser, you should protect against CSRF with techniques like same-site cookies, CSRF tokens, or double-submit patterns.

---

## 7. Example multiple-choice answers

Q: Valid ES module import for fs?
A: import * as fs from 'fs'; is generally valid in an ES module in Node. Depending on your Node version and configuration, import fs from 'fs'; can also work when Node exposes a default-like export; require('fs') is not valid inside a true ESM file without additional flags.

Q: What blocks the event loop in the MCQ?
A: The long loop and the heavy synchronous JSON parsing block. Async fs.readFile does not block.

---

These answers are intentionally concise so you can revise quickly. You can expand any section into full code examples and add unit tests when practicing.

# Node.js Practice â€“ Code Snippets

This file contains short example snippets for the topics we discussed: Express REST API, rate limiting middleware, streams/`fs`, and `EventEmitter`.

---

## 1. Minimal Express REST API (CRUD)

```js
// package.json should have: "type": "module" or use require() instead of import
import express from 'express';

const app = express();
const port = 3000;

// In-memory store
let posts = [];
let nextId = 1;

app.use(express.json()); // Parse JSON bodies

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.url} -> ${res.statusCode} (${ms}ms)`);
  });
  next();
});

// Create a post
app.post('/posts', (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'title and body are required' });
    }
    const post = { id: nextId++, title, body };
    posts.push(post);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// Get all posts
app.get('/posts', (req, res, next) => {
  try {
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Get a single post
app.get('/posts/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Update a post
app.put('/posts/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, body } = req.body;
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Not found' });

    if (title !== undefined) post.title = title;
    if (body !== undefined) post.body = body;

    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Delete a post
app.delete('/posts/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    posts.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
```

---

## 2. Simple rate limiter middleware

```js
// Basic in-memory rate limiter
function rateLimiter({ windowMs = 60_000, max = 60 } = {}) {
  const hits = new Map(); // key -> { count, windowStart }

  return (req, res, next) => {
    const key = req.ip; // or use a user id / API key
    const now = Date.now();
    const record = hits.get(key) || { count: 0, windowStart: now };

    // Reset window if expired
    if (now - record.windowStart > windowMs) {
      record.count = 0;
      record.windowStart = now;
    }

    record.count += 1;
    hits.set(key, record);

    if (record.count > max) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    next();
  };
}

// Usage with Express
import express from 'express';
const app = express();

app.use(rateLimiter({ windowMs: 60_000, max: 10 }));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000);
```

---

## 3. Streams: copy a file and count lines with "ERROR"

```js
// copy-file.js
import fs from 'fs';

const source = 'input.txt';
const dest = 'output.txt';

fs.createReadStream(source)
  .pipe(fs.createWriteStream(dest))
  .on('finish', () => {
    console.log('Copy complete');
  })
  .on('error', (err) => {
    console.error('Copy failed:', err);
  });
```

```js
// count-error-lines.js
import fs from 'fs';
import readline from 'readline';

const fileStream = fs.createReadStream('input.txt');

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let count = 0;

rl.on('line', (line) => {
  if (line.includes('ERROR')) {
    count += 1;
  }
});

rl.on('close', () => {
  console.log(`Lines containing "ERROR": ${count}`);
});
```

---

## 4. EventEmitter example

```js
import { EventEmitter } from 'events';

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

// Register listener
emitter.on('data', (payload) => {
  console.log('Received data:', payload);
});

// Emit event
emitter.emit('data', { id: 1, message: 'Hello from EventEmitter' });
```

---

## 5. Simple concurrency limiter helper

```js
// limitConcurrency.js
export function limitConcurrency(tasks, limit) {
  // tasks: array of functions returning a Promise
  const results = [];
  let index = 0;
  let active = 0;

  return new Promise((resolve, reject) => {
    function runNext() {
      // All tasks done
      if (index === tasks.length && active === 0) {
        return resolve(results);
      }

      while (active < limit && index < tasks.length) {
        const currentIndex = index++;
        const task = tasks[currentIndex];
        active++;

        Promise.resolve()
          .then(task)
          .then((value) => {
            results[currentIndex] = value;
          })
          .catch(reject)
          .finally(() => {
            active--;
            runNext();
          });
      }
    }

    runNext();
  });
}

// Example usage
// const tasks = urls.map(url => () => fetch(url).then(r => r.text()));
// limitConcurrency(tasks, 5).then(console.log).catch(console.error);
```

---

## 6. Basic JWT middleware skeleton (conceptual)

```js
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid Authorization format' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload; // attach claims to request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export default authMiddleware;
```

---

These snippets are simplified to highlight the main ideas youâ€™ll be tested on (Express routes, middleware, streams, EventEmitter, concurrency limiting, and JWT auth).


# Node.js Core Modules â€“ Simple Examples

Below are some of the most common Node.js core modules with short, easy-to-understand code snippets.

---

## 1. `fs` â€“ File system

Read and write a small text file:

```js
// fs-example.js
import fs from 'fs';

// Write a file
fs.writeFile('hello.txt', 'Hello from Node fs!', (err) => {
  if (err) {
    return console.error('Write error:', err);
  }
  console.log('File written');

  // Read the same file
  fs.readFile('hello.txt', 'utf8', (err, data) => {
    if (err) {
      return console.error('Read error:', err);
    }
    console.log('File contents:', data);
  });
});
```

---

## 2. `path` â€“ Paths and file names

Build portable file paths:

```js
// path-example.js
import path from 'path';

const fullPath = path.join('users', 'alice', 'notes.txt');
console.log('Joined path:', fullPath);

console.log('Base name:', path.basename(fullPath)); // notes.txt
console.log('Directory:', path.dirname(fullPath));  // users/alice
console.log('Extension:', path.extname(fullPath));  // .txt
```

---

## 3. `os` â€“ Operating system info

Get simple system information:

```js
// os-example.js
import os from 'os';

console.log('Platform:', os.platform());
console.log('CPU architecture:', os.arch());
console.log('Home dir:', os.homedir());
console.log('Total memory (MB):', os.totalmem() / 1024 / 1024);
console.log('Free memory (MB):', os.freemem() / 1024 / 1024);
```

---

## 4. `http` â€“ Basic HTTP server

Very small HTTP server that returns text:

```js
// http-example.js
import http from 'http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from core http module!');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000');
});
```

---

## 5. `events` â€“ Custom events (EventEmitter)

Emit and listen to custom events:

```js
// events-example.js
import { EventEmitter } from 'events';

const emitter = new EventEmitter();

emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit('greet', 'Node developer');
```

---

## 6. `url` â€“ Parse URLs

Parse a URL into its parts:

```js
// url-example.js
import { URL } from 'url';

const myUrl = new URL('https://example.com:8080/path/page?search=test#section1');

console.log('Host:', myUrl.host);      // example.com:8080
console.log('Hostname:', myUrl.hostname); // example.com
console.log('Pathname:', myUrl.pathname); // /path/page
console.log('Search params:', myUrl.searchParams.get('search')); // test
console.log('Hash:', myUrl.hash);     // #section1
```

---

## 7. `querystring` â€“ Parse query strings (legacy)

```js
// querystring-example.js
import querystring from 'querystring';

const qs = 'name=alice&age=30';

const parsed = querystring.parse(qs);
console.log(parsed.name); // 'alice'
console.log(parsed.age);  // '30'

const str = querystring.stringify({ city: 'LA', active: true });
console.log(str); // 'city=LA&active=true'
```

---

## 8. `crypto` â€“ Simple hashing

Create a SHA256 hash of a string:

```js
// crypto-example.js
import crypto from 'crypto';

const data = 'my-secret-password';

const hash = crypto.createHash('sha256').update(data).digest('hex');
console.log('SHA256 hash:', hash);
```

---

## 9. `child_process` â€“ Run shell commands

Run a simple shell command and print its output:

```js
// child-process-example.js
import { exec } from 'child_process';

exec('node -v', (err, stdout, stderr) => {
  if (err) {
    console.error('Error running command:', err);
    return;
  }
  console.log('Node version:', stdout.trim());
  if (stderr) {
    console.error('stderr:', stderr);
  }
});
```

---

## 10. `readline` â€“ Read user input from terminal

Ask a question and read answer from the console:

```js
// readline-example.js
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What is your name? ', (answer) => {
  console.log(`Hello, ${answer}!`);
  rl.close();
});
```

---

## 11. `timers` â€“ `setTimeout` and `setInterval`

```js
// timers-example.js
console.log('Start');

setTimeout(() => {
  console.log('This runs after ~1 second');
}, 1000);

let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log('Interval tick', count);
  if (count === 3) {
    clearInterval(intervalId);
    console.log('Interval cleared');
  }
}, 500);
```

---

These examples are intentionally small so you can quickly run each file with `node file-name.js` and see what the core module does.

# Node.js Assessment Cheat Sheet

This cheat sheet combines common Node.js interview and assessment topics, short theory answers, and simple code snippets for revision.[1][2][3]

## Core concepts

### What is Node.js?
Node.js is an open-source, cross-platform JavaScript runtime built on the V8 engine that lets JavaScript run outside the browser, commonly for server-side applications. It is popular for networked and I/O-heavy applications because it uses an event-driven, non-blocking model.[2][4]

### Why is Node.js called single-threaded?
Node.js runs JavaScript on a main single thread, but it can still handle many concurrent operations through the event loop and background system work managed by libuv. This means one thread executes JS code while I/O can be handled asynchronously without blocking that main flow.[2]

### What is libuv?
libuv is the library that provides Node.js with its event loop, thread pool, and cross-platform asynchronous I/O support. It powers timers, file system tasks, DNS lookups, and other non-blocking operations.[2]

### What is the event loop?
The event loop is the mechanism that lets Node.js process asynchronous callbacks and scheduled tasks over time. It works through phases such as timers, I/O callbacks, and check, which is why functions like `setTimeout` and `setImmediate` behave differently.[5][2]

### `process.nextTick` vs `setImmediate` vs `setTimeout`
- `process.nextTick()` runs after the current operation completes, before the event loop continues.[5]
- `setImmediate()` runs in the check phase, usually after I/O callbacks.[5]
- `setTimeout(fn, delay)` runs in the timers phase after at least the specified delay, but exact timing can vary based on system and event-loop load.[5]

### CommonJS vs ES modules
CommonJS uses `require()` and `module.exports`, while ES modules use `import` and `export` syntax. In CommonJS, `fs` is usually imported with `const fs = require('fs')`, while in ESM it can be imported with `import * as fs from 'fs'`.[1]

### Worker threads, cluster, and child processes
Worker threads are best for CPU-heavy JavaScript work inside the same process. Cluster creates multiple Node.js processes to use multiple CPU cores for server workloads, while child processes are useful for running separate OS-level commands or isolated programs.[2]

## Async JavaScript

### Callbacks, Promises, and `async/await`
Callbacks are functions passed to run later when asynchronous work finishes, often using the Node.js error-first style `(err, result)`. Promises represent a future result and support chaining with `.then()` and `.catch()`, while `async/await` makes Promise-based code easier to read and write.[1]

### `Promise.all()`
`Promise.all()` takes multiple Promises and resolves when all of them succeed, returning results in order. If any Promise rejects, the combined Promise rejects immediately.[1]

### Concurrency limiter idea
A simple concurrency limiter starts only a fixed number of async tasks at a time and launches the next task when one finishes. This is useful when hitting APIs or processing large batches without overloading resources.[6]

```js
export function limitConcurrency(tasks, limit) {
  const results = [];
  let index = 0;
  let active = 0;

  return new Promise((resolve, reject) => {
    function runNext() {
      if (index === tasks.length && active === 0) {
        return resolve(results);
      }

      while (active < limit && index < tasks.length) {
        const currentIndex = index++;
        const task = tasks[currentIndex];
        active++;

        Promise.resolve()
          .then(task)
          .then((value) => {
            results[currentIndex] = value;
          })
          .catch(reject)
          .finally(() => {
            active--;
            runNext();
          });
      }
    }

    runNext();
  });
}
```

## Express and REST API

Assessment tasks often ask candidates to build or extend a small REST API with CRUD routes, JSON parsing, and error handling. A common pattern is an in-memory posts API with `GET`, `POST`, `PUT`, and `DELETE` routes.[7][8]

```js
import express from 'express';

const app = express();
const port = 3000;
let posts = [];
let nextId = 1;

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.url} -> ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

app.post('/posts', (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ error: 'title and body are required' });
  }
  const post = { id: nextId++, title, body };
  posts.push(post);
  res.status(201).json(post);
});

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Not found' });
  const { title, body } = req.body;
  if (title !== undefined) post.title = title;
  if (body !== undefined) post.body = body;
  res.json(post);
});

app.delete('/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  posts.splice(index, 1);
  res.status(204).send();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
```

### Simple rate limiter middleware
A rate limiter tracks request counts within a time window and returns HTTP 429 when the limit is exceeded.[7]

```js
function rateLimiter({ windowMs = 60_000, max = 10 } = {}) {
  const hits = new Map();

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const record = hits.get(key) || { count: 0, windowStart: now };

    if (now - record.windowStart > windowMs) {
      record.count = 0;
      record.windowStart = now;
    }

    record.count += 1;
    hits.set(key, record);

    if (record.count > max) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    next();
  };
}
```

## Streams, events, and error handling

Streams let Node.js process data in chunks instead of loading everything into memory, which helps with large files and network data. `EventEmitter` allows custom events and listeners, which is a common Node.js pattern.[1][2]

### File copy with streams

```js
import fs from 'fs';

fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'))
  .on('finish', () => console.log('Copy complete'))
  .on('error', (err) => console.error(err));
```

### Count lines containing `ERROR`

```js
import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity,
});

let count = 0;

rl.on('line', (line) => {
  if (line.includes('ERROR')) count++;
});

rl.on('close', () => {
  console.log('Lines containing ERROR:', count);
});
```

### EventEmitter example

```js
import { EventEmitter } from 'events';

const emitter = new EventEmitter();

emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit('greet', 'Node developer');
```

### Error handling basics
Operational errors include things like missing files, failed requests, or database timeouts and should usually be handled gracefully. Programmer errors are bugs in the code and often require fixing the code rather than masking the problem at runtime.[1]

## Security basics

Sensitive values such as database passwords and API keys should be stored in environment variables or secret-management systems rather than hard-coded in source files. JWT-based authentication commonly sends a signed token from the server to the client and verifies that token on later requests.[1]

```js
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid Authorization format' });
  }

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
```

## Core modules

Node.js includes built-in core modules that can be used without installing external packages. Learning these modules helps build a strong foundation for assessments and backend development.[3][4]

### `fs` module
Used for reading, writing, and managing files.[3]

```js
import fs from 'fs';

fs.writeFile('hello.txt', 'Hello from Node fs!', (err) => {
  if (err) return console.error(err);

  fs.readFile('hello.txt', 'utf8', (err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });
});
```

### `path` module
Used for building and inspecting file paths in a portable way across operating systems.[3]

```js
import path from 'path';

const fullPath = path.join('users', 'alice', 'notes.txt');
console.log(path.basename(fullPath));
console.log(path.dirname(fullPath));
console.log(path.extname(fullPath));
```

### `os` module
Used for getting operating system information such as platform, architecture, memory, and home directory.[3]

```js
import os from 'os';

console.log(os.platform());
console.log(os.arch());
console.log(os.homedir());
console.log(os.totalmem());
console.log(os.freemem());
```

### `http` module
Used to create a raw HTTP server without Express.[3]

```js
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from core http module!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### `events` module
Used to create and listen for custom events through `EventEmitter`.[3]

```js
import { EventEmitter } from 'events';

const emitter = new EventEmitter();
emitter.on('done', () => console.log('Task finished'));
emitter.emit('done');
```

### `url` module
Used to parse and inspect URLs in a structured way.[3]

```js
import { URL } from 'url';

const myUrl = new URL('https://example.com:8080/path/page?search=test#section1');
console.log(myUrl.host);
console.log(myUrl.pathname);
console.log(myUrl.searchParams.get('search'));
```

### `crypto` module
Used for hashing, encryption, and secure token generation.[3]

```js
import crypto from 'crypto';

const hash = crypto.createHash('sha256')
  .update('my-secret-password')
  .digest('hex');

console.log(hash);
```

### `child_process` module
Used to run shell commands or external programs from Node.js.[3]

```js
import { exec } from 'child_process';

exec('node -v', (err, stdout) => {
  if (err) return console.error(err);
  console.log(stdout.trim());
});
```

### `readline` module
Used for reading input line by line or interacting with the terminal.[3]

```js
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What is your name? ', (answer) => {
  console.log(`Hello, ${answer}!`);
  rl.close();
});
```

## Quick revision points

- Understand the event loop, async programming, and non-blocking I/O first.[4][2]
- Practice building a small REST API with Express and middleware.[8][7]
- Know how streams, `fs`, and `EventEmitter` work in real examples.[2][1]
- Review core modules such as `fs`, `path`, `os`, `http`, `url`, `crypto`, and `readline`.[3]
- Learn where to use worker threads, cluster, and child processes.[2]

Sources
[1] Top 80+ Node.js Interview Questions and Answers (2025) https://www.interviewbit.com/node-js-interview-questions/
[2] The Best Testing Tools for Node.js https://developer.okta.com/blog/2020/01/27/best-nodejs-testing-tools
[3] Node.js Modules https://www.w3schools.com/nodejs/nodejs_modules.asp
[4] Introduction to Node.js | Node.js Learn https://nodejs.org/learn/getting-started/introduction-to-nodejs
[5] goldbergyoni/nodejs-testing-best-practices: Beyond the ... https://github.com/goldbergyoni/nodejs-testing-best-practices
[6] NodeJs interview questions [DISCUSSION] : r/node https://www.reddit.com/r/node/comments/11dk5m8/nodejs_interview_questions_discussion/
[7] 25+ Node.js Interview Questions https://coderpad.io/interview-questions/nodejs-interview-questions/
[8] I have an interview tomorrow for the NodeJs developer. ... https://www.reddit.com/r/node/comments/z21jjl/i_have_an_interview_tomorrow_for_the_nodejs/

