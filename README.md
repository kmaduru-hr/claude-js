# Complete JavaScript Array Methods Guide

> A comprehensive reference for all essential JavaScript array methods with practical examples for interviews and real-world projects.

## 📑 Table of Contents

- [1. Adding/Removing Elements](#1-addingremoving-elements)
- [2. Searching & Finding](#2-searching--finding)
- [3. Transforming Arrays](#3-transforming-arrays)
- [4. Filtering & Testing](#4-filtering--testing)
- [5. Sorting & Reversing](#5-sorting--reversing)
- [6. Iteration Methods](#6-iteration-methods)
- [7. Combining & Slicing](#7-combining--slicing)
- [8. Advanced Methods](#8-advanced-methods)
- [9. ES2023 New Methods](#9-es2023-new-methods)
- [Quick Reference Cheat Sheet](#-quick-reference-cheat-sheet)
- [Common Patterns for Interviews](#-common-patterns-for-interviews)

---

## 1. Adding/Removing Elements

### `push()` — Add to End

```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

arr.push(5, 6);
console.log(arr); // [1, 2, 3, 4, 5, 6]

// Returns new length
const length = arr.push(7);
console.log(length); // 7
```

> ⚠️ **Mutates** original array!

### `pop()` — Remove from End

```javascript
const arr = [1, 2, 3, 4];
const removed = arr.pop();
console.log(removed); // 4
console.log(arr);     // [1, 2, 3]

// Empty array
const empty = [];
console.log(empty.pop()); // undefined
```

> ⚠️ **Mutates** original array!

### `unshift()` — Add to Beginning

```javascript
const arr = [2, 3, 4];
arr.unshift(1);
console.log(arr); // [1, 2, 3, 4]

arr.unshift(-1, 0);
console.log(arr); // [-1, 0, 1, 2, 3, 4]

// Returns new length
const length = arr.unshift(-2);
console.log(length); // 7
```

> ⚠️ **Mutates** original array!

### `shift()` — Remove from Beginning

```javascript
const arr = [1, 2, 3, 4];
const removed = arr.shift();
console.log(removed); // 1
console.log(arr);     // [2, 3, 4]
```

> ⚠️ **Mutates** original array!

### `splice()` — Add/Remove at Any Position

```javascript
const arr = [1, 2, 3, 4, 5];

// Remove 2 elements starting at index 1
const removed = arr.splice(1, 2);
console.log(removed); // [2, 3]
console.log(arr);     // [1, 4, 5]

// Add elements at index 1
arr.splice(1, 0, 'a', 'b');
console.log(arr); // [1, 'a', 'b', 4, 5]

// Replace elements
arr.splice(1, 2, 'x', 'y', 'z');
console.log(arr); // [1, 'x', 'y', 'z', 4, 5]

// Remove all from index 2 onwards
arr.splice(2);
console.log(arr); // [1, 'x']
```

> ⚠️ **Mutates** original array!

---

## 2. Searching & Finding

### `indexOf()` — Find First Index

```javascript
const arr = [1, 2, 3, 2, 1];

console.log(arr.indexOf(2));    // 1 (first occurrence)
console.log(arr.indexOf(5));    // -1 (not found)
console.log(arr.indexOf(1, 2)); // 4 (search from index 2)

// Case-sensitive for strings
const names = ['Alice', 'Bob', 'alice'];
console.log(names.indexOf('alice')); // 2
```

### `lastIndexOf()` — Find Last Index

```javascript
const arr = [1, 2, 3, 2, 1];

console.log(arr.lastIndexOf(2)); // 3 (last occurrence)
console.log(arr.lastIndexOf(1)); // 4
```

### `includes()` — Check if Exists

```javascript
const arr = [1, 2, 3, 4, 5];

console.log(arr.includes(3));    // true
console.log(arr.includes(10));   // false
console.log(arr.includes(2, 2)); // false (search from index 2)

// Works with NaN
console.log([1, 2, NaN].includes(NaN)); // true
console.log([1, 2, NaN].indexOf(NaN));  // -1 (indexOf doesn't work with NaN!)
```

### `find()` — Find First Matching Element

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Bob' }

const notFound = users.find(u => u.id === 10);
console.log(notFound); // undefined

// Find first even number
const nums = [1, 3, 4, 5, 6];
const firstEven = nums.find(n => n % 2 === 0);
console.log(firstEven); // 4
```

### `findIndex()` — Find First Matching Index

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const index = users.findIndex(u => u.name === 'Bob');
console.log(index); // 1

const notFound = users.findIndex(u => u.name === 'Charlie');
console.log(notFound); // -1
```

### `findLast()` & `findLastIndex()` — ES2023

```javascript
const nums = [1, 2, 3, 4, 5, 6];

// Find last even number
const lastEven = nums.findLast(n => n % 2 === 0);
console.log(lastEven); // 6

const lastEvenIndex = nums.findLastIndex(n => n % 2 === 0);
console.log(lastEvenIndex); // 5
```

---

## 3. Transforming Arrays

### `map()` — Transform Each Element

```javascript
const nums = [1, 2, 3, 4];

// Double each number
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8]

// Extract property
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
const names = users.map(u => u.name);
console.log(names); // ['Alice', 'Bob']

// With index
const indexed = nums.map((n, i) => `${i}: ${n}`);
console.log(indexed); // ['0: 1', '1: 2', '2: 3', '3: 4']

// ✅ Does NOT mutate original array
console.log(nums); // [1, 2, 3, 4]
```

### `flatMap()` — Map + Flatten

```javascript
const sentences = ['Hello world', 'How are you'];

// Split into words
const words = sentences.flatMap(s => s.split(' '));
console.log(words); // ['Hello', 'world', 'How', 'are', 'you']

// Compare with map
const withMap = sentences.map(s => s.split(' '));
console.log(withMap); // [['Hello', 'world'], ['How', 'are', 'you']]

// Practical example: Extract tags
const posts = [
  { tags: ['js', 'react'] },
  { tags: ['css', 'html'] }
];
const allTags = posts.flatMap(p => p.tags);
console.log(allTags); // ['js', 'react', 'css', 'html']
```

### `flat()` — Flatten Nested Arrays

```javascript
const nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat());         // [1, 2, 3, 4, [5, 6]] (depth 1)
console.log(nested.flat(2));        // [1, 2, 3, 4, 5, 6] (depth 2)
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6] (all levels)

// Remove empty slots
const sparse = [1, , 2, , 3];
console.log(sparse.flat()); // [1, 2, 3]
```

---

## 4. Filtering & Testing

### `filter()` — Keep Elements that Match

```javascript
const nums = [1, 2, 3, 4, 5, 6];

// Keep even numbers
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]

// Filter objects
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
];
const adults = users.filter(u => u.age >= 18);
console.log(adults);
// [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 30 }]

// Remove falsy values
const mixed = [0, 1, false, 2, '', 3, null, 4, undefined, 5];
const truthy = mixed.filter(Boolean);
console.log(truthy); // [1, 2, 3, 4, 5]
```

> ✅ Does **NOT** mutate original array

### `every()` — Test if All Match

```javascript
const nums = [2, 4, 6, 8];

console.log(nums.every(n => n % 2 === 0)); // true (all even)
console.log(nums.every(n => n > 5));       // false (not all > 5)

// Check if all users are adults
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];
console.log(users.every(u => u.age >= 18)); // true

// Empty array returns true!
console.log([].every(n => n > 100)); // true
```

### `some()` — Test if Any Match

```javascript
const nums = [1, 3, 5, 6, 7];

console.log(nums.some(n => n % 2 === 0)); // true (6 is even)
console.log(nums.some(n => n > 10));      // false (none > 10)

// Check if any user is admin
const users = [
  { name: 'Alice', role: 'user' },
  { name: 'Bob', role: 'admin' }
];
console.log(users.some(u => u.role === 'admin')); // true

// Empty array returns false!
console.log([].some(n => n > 0)); // false
```

---

## 5. Sorting & Reversing

### `sort()` — Sort Elements

```javascript
// Numbers (⚠️ sorts as strings by default!)
const nums = [40, 100, 1, 5, 25];
console.log(nums.sort()); // [1, 100, 25, 40, 5] ❌ WRONG!

// ✅ Correct way for numbers
console.log(nums.sort((a, b) => a - b)); // [1, 5, 25, 40, 100] (ascending)
console.log(nums.sort((a, b) => b - a)); // [100, 40, 25, 5, 1] (descending)

// Strings (alphabetical)
const names = ['Charlie', 'Alice', 'Bob'];
console.log(names.sort()); // ['Alice', 'Bob', 'Charlie']

// Case-insensitive sort
const mixed = ['alice', 'Bob', 'Charlie'];
console.log(mixed.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())));
// ['alice', 'Bob', 'Charlie']

// Sort objects
const users = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];
users.sort((a, b) => a.age - b.age); // Sort by age
console.log(users);
// [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 30 }, { name: 'Bob', age: 35 }]
```

> ⚠️ **Mutates** original array! Use `[...arr].sort()` to avoid.

### `reverse()` — Reverse Order

```javascript
const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// Non-mutating reverse
const original = [1, 2, 3];
const reversed = [...original].reverse();
console.log(original); // [1, 2, 3]
console.log(reversed); // [3, 2, 1]

// Or use toReversed() (ES2023)
const reversed2 = original.toReversed();
console.log(reversed2); // [3, 2, 1]
```

> ⚠️ **Mutates** original array!

---

## 6. Iteration Methods

### `forEach()` — Execute Function for Each

```javascript
const nums = [1, 2, 3];

nums.forEach((num, index, array) => {
  console.log(`Index ${index}: ${num}`);
});
/*
Index 0: 1
Index 1: 2
Index 2: 3
*/

// Common use: Side effects
const users = ['Alice', 'Bob', 'Charlie'];
users.forEach(user => {
  console.log(`Hello, ${user}!`);
});

// ❌ Return doesn't work like you think
nums.forEach(n => {
  if (n === 2) return; // Only skips current iteration, doesn't exit loop!
  console.log(n);
});
// Prints: 1, 3
```

> ⚠️ Cannot break or return early — use `for...of` instead.

### `reduce()` — Reduce to Single Value

```javascript
const nums = [1, 2, 3, 4, 5];

// Sum
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// Product
const product = nums.reduce((acc, curr) => acc * curr, 1);
console.log(product); // 120

// Max value
const max = nums.reduce((max, curr) => Math.max(max, curr), -Infinity);
console.log(max); // 5

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// Group by property
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];
const groupedByAge = users.reduce((acc, user) => {
  const age = user.age;
  if (!acc[age]) acc[age] = [];
  acc[age].push(user);
  return acc;
}, {});
console.log(groupedByAge);
/*
{
  25: [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
  30: [{ name: 'Bob', age: 30 }]
}
*/

// Flatten array
const nested = [[1, 2], [3, 4], [5]];
const flattened = nested.reduce((acc, curr) => acc.concat(curr), []);
console.log(flattened); // [1, 2, 3, 4, 5]

// Build object from array
const pairs = [['name', 'Alice'], ['age', 25]];
const obj = pairs.reduce((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});
console.log(obj); // { name: 'Alice', age: 25 }
```

### `reduceRight()` — Reduce from Right to Left

```javascript
const arr = [1, 2, 3, 4];

// Left to right
console.log(arr.reduce((acc, curr) => acc - curr)); // ((1-2)-3)-4 = -8

// Right to left
console.log(arr.reduceRight((acc, curr) => acc - curr)); // ((4-3)-2)-1 = -2

// Reverse string
const str = 'hello';
const reversed = str.split('').reduceRight((acc, char) => acc + char, '');
console.log(reversed); // 'olleh'
```

---

## 7. Combining & Slicing

### `concat()` — Merge Arrays

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const merged = arr1.concat(arr2, arr3);
console.log(merged); // [1, 2, 3, 4, 5, 6]

// With values
const result = arr1.concat(arr2, 7, 8);
console.log(result); // [1, 2, 3, 4, 7, 8]

// Modern alternative: spread operator
const merged2 = [...arr1, ...arr2, ...arr3];
console.log(merged2); // [1, 2, 3, 4, 5, 6]
```

> ✅ Does **NOT** mutate original arrays

### `slice()` — Extract Portion

```javascript
const arr = [1, 2, 3, 4, 5];

console.log(arr.slice(2));      // [3, 4, 5] (from index 2)
console.log(arr.slice(1, 4));   // [2, 3, 4] (index 1 to 3)
console.log(arr.slice(-2));     // [4, 5] (last 2)
console.log(arr.slice(-3, -1)); // [3, 4] (from -3 to -1)

// Copy array
const copy = arr.slice();
console.log(copy); // [1, 2, 3, 4, 5]

// ✅ Does NOT mutate original array
console.log(arr); // [1, 2, 3, 4, 5]
```

### `join()` — Array to String

```javascript
const arr = ['Hello', 'world', '!'];

console.log(arr.join());      // 'Hello,world,!' (default comma)
console.log(arr.join(' '));   // 'Hello world !'
console.log(arr.join('-'));   // 'Hello-world-!'
console.log(arr.join(''));    // 'Helloworld!'

// CSV format
const data = [['Name', 'Age'], ['Alice', 25], ['Bob', 30]];
const csv = data.map(row => row.join(',')).join('\n');
console.log(csv);
/*
Name,Age
Alice,25
Bob,30
*/
```

---

## 8. Advanced Methods

### `fill()` — Fill with Static Value

```javascript
const arr = [1, 2, 3, 4, 5];

arr.fill(0);
console.log(arr); // [0, 0, 0, 0, 0]

// Fill range
const arr2 = [1, 2, 3, 4, 5];
arr2.fill(9, 1, 4); // Fill index 1 to 3
console.log(arr2); // [1, 9, 9, 9, 5]

// Create initialized array
const zeros = new Array(5).fill(0);
console.log(zeros); // [0, 0, 0, 0, 0]
```

> ⚠️ **Mutates** original array!

### `copyWithin()` — Copy Part of Array to Another Location

```javascript
const arr = [1, 2, 3, 4, 5];

// Copy element at index 0 to index 3
arr.copyWithin(3, 0);
console.log(arr); // [1, 2, 3, 1, 2]

// Copy elements 0-2 to position 2
const arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(2, 0, 2);
console.log(arr2); // [1, 2, 1, 2, 5]
```

> ⚠️ **Mutates** original array!

### `Array.from()` — Create Array from Iterable

```javascript
// From string
console.log(Array.from('hello')); // ['h', 'e', 'l', 'l', 'o']

// From Set
const set = new Set([1, 2, 3, 2, 1]);
console.log(Array.from(set)); // [1, 2, 3]

// From Map
const map = new Map([['a', 1], ['b', 2]]);
console.log(Array.from(map)); // [['a', 1], ['b', 2]]

// With mapping function
console.log(Array.from([1, 2, 3], x => x * 2)); // [2, 4, 6]

// Generate sequence
console.log(Array.from({ length: 5 }, (_, i) => i));     // [0, 1, 2, 3, 4]
console.log(Array.from({ length: 5 }, (_, i) => i * 2)); // [0, 2, 4, 6, 8]

// From NodeList (DOM)
const divs = document.querySelectorAll('div');
const divArray = Array.from(divs);
```

### `Array.of()` — Create Array from Arguments

```javascript
console.log(Array.of(1, 2, 3)); // [1, 2, 3]
console.log(Array.of(7));       // [7]

// Compare with Array constructor
console.log(Array(7));    // [ <7 empty items> ] (creates array of length 7)
console.log(Array.of(7)); // [7] (creates array with element 7)
```

### `Array.isArray()` — Check if Array

```javascript
console.log(Array.isArray([1, 2, 3]));             // true
console.log(Array.isArray('hello'));               // false
console.log(Array.isArray({ 0: 'a', length: 1 })); // false
console.log(Array.isArray(null));                  // false
```

### `at()` — Access by Index (Supports Negative)

```javascript
const arr = [1, 2, 3, 4, 5];

console.log(arr.at(0));   // 1
console.log(arr.at(2));   // 3
console.log(arr.at(-1));  // 5 (last element)
console.log(arr.at(-2));  // 4 (second to last)

// Compare with bracket notation
console.log(arr[-1]);             // undefined (doesn't work)
console.log(arr[arr.length - 1]); // 5 (old way)
```

---

## 9. ES2023 New Methods

### `toSorted()` — Non-Mutating Sort

```javascript
const arr = [3, 1, 2];
const sorted = arr.toSorted();
console.log(arr);    // [3, 1, 2] (unchanged)
console.log(sorted); // [1, 2, 3]
```

### `toReversed()` — Non-Mutating Reverse

```javascript
const arr = [1, 2, 3];
const reversed = arr.toReversed();
console.log(arr);      // [1, 2, 3] (unchanged)
console.log(reversed); // [3, 2, 1]
```

### `toSpliced()` — Non-Mutating Splice

```javascript
const arr = [1, 2, 3, 4, 5];
const result = arr.toSpliced(1, 2, 'a', 'b');
console.log(arr);    // [1, 2, 3, 4, 5] (unchanged)
console.log(result); // [1, 'a', 'b', 4, 5]
```

### `with()` — Non-Mutating Element Update

```javascript
const arr = [1, 2, 3, 4, 5];
const result = arr.with(2, 99);
console.log(arr);    // [1, 2, 3, 4, 5] (unchanged)
console.log(result); // [1, 2, 99, 4, 5]
```

---

## 📋 Quick Reference Cheat Sheet

| Method          | Mutates? | Returns               | Use Case             |
| --------------- | :------: | --------------------- | -------------------- |
| `push()`        |   ✅ Yes  | New length            | Add to end           |
| `pop()`         |   ✅ Yes  | Removed element       | Remove from end      |
| `shift()`       |   ✅ Yes  | Removed element       | Remove from start    |
| `unshift()`     |   ✅ Yes  | New length            | Add to start         |
| `splice()`      |   ✅ Yes  | Removed elements      | Add/remove anywhere  |
| `sort()`        |   ✅ Yes  | Sorted array          | Sort                 |
| `reverse()`     |   ✅ Yes  | Reversed array        | Reverse              |
| `fill()`        |   ✅ Yes  | Modified array        | Fill with value      |
| `copyWithin()`  |   ✅ Yes  | Modified array        | Copy within          |
| `map()`         |   ❌ No   | New array             | Transform            |
| `filter()`      |   ❌ No   | New array             | Keep matching        |
| `reduce()`      |   ❌ No   | Single value          | Accumulate           |
| `slice()`       |   ❌ No   | New array             | Extract portion      |
| `concat()`      |   ❌ No   | New array             | Merge                |
| `flat()`        |   ❌ No   | New array             | Flatten              |
| `flatMap()`     |   ❌ No   | New array             | Map + flatten        |
| `find()`        |   ❌ No   | Element or `undefined`| Find first match     |
| `findIndex()`   |   ❌ No   | Index or `-1`         | Find first index     |
| `indexOf()`     |   ❌ No   | Index or `-1`         | Find index           |
| `includes()`    |   ❌ No   | Boolean               | Check exists         |
| `every()`       |   ❌ No   | Boolean               | Test all             |
| `some()`        |   ❌ No   | Boolean               | Test any             |
| `forEach()`     |   ❌ No   | `undefined`           | Iterate              |
| `join()`        |   ❌ No   | String                | To string            |
| `toSorted()`    |   ❌ No   | New sorted array      | Sort (immutable)     |
| `toReversed()`  |   ❌ No   | New reversed array    | Reverse (immutable)  |
| `toSpliced()`   |   ❌ No   | New array             | Splice (immutable)   |
| `with()`        |   ❌ No   | New array             | Update (immutable)   |

---

## 💡 Common Patterns for Interviews

### Remove Duplicates

```javascript
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]
```

### Chunk Array

```javascript
const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3)); // [[1, 2, 3], [4, 5, 6], [7]]
```

### Shuffle Array

```javascript
const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};
```

### Array Intersection

```javascript
const intersection = (arr1, arr2) => {
  return arr1.filter(item => arr2.includes(item));
};

console.log(intersection([1, 2, 3], [2, 3, 4])); // [2, 3]
```

### Array Difference

```javascript
const difference = (arr1, arr2) => {
  return arr1.filter(item => !arr2.includes(item));
};

console.log(difference([1, 2, 3, 4], [2, 4])); // [1, 3]
```

### Sum / Average

```javascript
const sum = arr => arr.reduce((a, b) => a + b, 0);
const avg = arr => sum(arr) / arr.length;

console.log(sum([1, 2, 3, 4])); // 10
console.log(avg([1, 2, 3, 4])); // 2.5
```

### Group By

```javascript
const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    const group = item[key];
    (acc[group] = acc[group] || []).push(item);
    return acc;
  }, {});
};
```

---

## 📚 Resources

- [MDN Array Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript.info — Arrays](https://javascript.info/array)
- [TC39 Proposals](https://github.com/tc39/proposals)

---

## 📝 License

Free to use for personal reference and learning.
