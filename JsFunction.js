Complete JavaScript Array Methods Guide
Let me show you all essential array methods with examples you can use in interviews and real projects.

Table of Contents

Adding/Removing Elements
Searching & Finding
Transforming Arrays
Filtering & Testing
Sorting & Reversing
Iteration Methods
Combining & Slicing
Advanced Methods


1. Adding/Removing Elements
push() - Add to End
javascriptconst arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

arr.push(5, 6);
console.log(arr); // [1, 2, 3, 4, 5, 6]

// Returns new length
const length = arr.push(7);
console.log(length); // 7

// ⚠️ Mutates original array!
pop() - Remove from End
javascriptconst arr = [1, 2, 3, 4];
const removed = arr.pop();
console.log(removed); // 4
console.log(arr);     // [1, 2, 3]

// Empty array
const empty = [];
console.log(empty.pop()); // undefined

// ⚠️ Mutates original array!
unshift() - Add to Beginning
javascriptconst arr = [2, 3, 4];
arr.unshift(1);
console.log(arr); // [1, 2, 3, 4]

arr.unshift(-1, 0);
console.log(arr); // [-1, 0, 1, 2, 3, 4]

// Returns new length
const length = arr.unshift(-2);
console.log(length); // 7

// ⚠️ Mutates original array!
shift() - Remove from Beginning
javascriptconst arr = [1, 2, 3, 4];
const removed = arr.shift();
console.log(removed); // 1
console.log(arr);     // [2, 3, 4]

// ⚠️ Mutates original array!
splice() - Add/Remove at Any Position
javascriptconst arr = [1, 2, 3, 4, 5];

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

// ⚠️ Mutates original array!

2. Searching & Finding
indexOf() - Find First Index
javascriptconst arr = [1, 2, 3, 2, 1];

console.log(arr.indexOf(2));    // 1 (first occurrence)
console.log(arr.indexOf(5));    // -1 (not found)
console.log(arr.indexOf(1, 2)); // 4 (search from index 2)

// Case-sensitive for strings
const names = ['Alice', 'Bob', 'alice'];
console.log(names.indexOf('alice')); // 2
lastIndexOf() - Find Last Index
javascriptconst arr = [1, 2, 3, 2, 1];

console.log(arr.lastIndexOf(2)); // 3 (last occurrence)
console.log(arr.lastIndexOf(1)); // 4
includes() - Check if Exists
javascriptconst arr = [1, 2, 3, 4, 5];

console.log(arr.includes(3));    // true
console.log(arr.includes(10));   // false
console.log(arr.includes(2, 2)); // false (search from index 2)

// Works with NaN
console.log([1, 2, NaN].includes(NaN)); // true
console.log([1, 2, NaN].indexOf(NaN));  // -1 (indexOf doesn't work with NaN!)
find() - Find First Matching Element
javascriptconst users = [
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
findIndex() - Find First Matching Index
javascriptconst users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const index = users.findIndex(u => u.name === 'Bob');
console.log(index); // 1

const notFound = users.findIndex(u => u.name === 'Charlie');
console.log(notFound); // -1
findLast() & findLastIndex() - ES2023
javascriptconst nums = [1, 2, 3, 4, 5, 6];

// Find last even number
const lastEven = nums.findLast(n => n % 2 === 0);
console.log(lastEven); // 6

const lastEvenIndex = nums.findLastIndex(n => n % 2 === 0);
console.log(lastEvenIndex); // 5

3. Transforming Arrays
map() - Transform Each Element
javascriptconst nums = [1, 2, 3, 4];

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
flatMap() - Map + Flatten
javascriptconst sentences = ['Hello world', 'How are you'];

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
flat() - Flatten Nested Arrays
javascriptconst nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]] (depth 1)
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6] (depth 2)
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6] (all levels)

// Remove empty slots
const sparse = [1, , 2, , 3];
console.log(sparse.flat()); // [1, 2, 3]

4. Filtering & Testing
filter() - Keep Elements that Match
javascriptconst nums = [1, 2, 3, 4, 5, 6];

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
console.log(adults); // [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 30 }]

// Remove falsy values
const mixed = [0, 1, false, 2, '', 3, null, 4, undefined, 5];
const truthy = mixed.filter(Boolean);
console.log(truthy); // [1, 2, 3, 4, 5]

// ✅ Does NOT mutate original array
every() - Test if All Match
javascriptconst nums = [2, 4, 6, 8];

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
some() - Test if Any Match
javascriptconst nums = [1, 3, 5, 6, 7];

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

5. Sorting & Reversing
sort() - Sort Elements
javascript// Numbers (⚠️ sorts as strings by default!)
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

// ⚠️ Mutates original array! Use [...arr].sort() to avoid
reverse() - Reverse Order
javascriptconst arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// ⚠️ Mutates original array!

// Non-mutating reverse
const original = [1, 2, 3];
const reversed = [...original].reverse();
console.log(original); // [1, 2, 3]
console.log(reversed); // [3, 2, 1]

// Or use toReversed() (ES2023)
const reversed2 = original.toReversed();
console.log(reversed2); // [3, 2, 1]

6. Iteration Methods
forEach() - Execute Function for Each
javascriptconst nums = [1, 2, 3];

nums.forEach((num, index, array) => {
  console.log(`Index ${index}: ${num}`);
});
/*
Index 0: 1
Index 1: 2
Index 2: 3
*/

// ⚠️ Cannot break or return early (use for...of instead)

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
reduce() - Reduce to Single Value
javascriptconst nums = [1, 2, 3, 4, 5];

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
reduceRight() - Reduce from Right to Left
javascriptconst arr = [1, 2, 3, 4];

// Left to right
console.log(arr.reduce((acc, curr) => acc - curr)); // ((1-2)-3)-4 = -8

// Right to left
console.log(arr.reduceRight((acc, curr) => acc - curr)); // ((4-3)-2)-1 = -2

// Reverse string
const str = 'hello';
const reversed = str.split('').reduceRight((acc, char) => acc + char, '');
console.log(reversed); // 'olleh'

7. Combining & Slicing
concat() - Merge Arrays
javascriptconst arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const merged = arr1.concat(arr2, arr3);
console.log(merged); // [1, 2, 3, 4, 5, 6]

// With values
const result = arr1.concat(arr2, 7, 8);
console.log(result); // [1, 2, 3, 4, 7, 8]

// ✅ Does NOT mutate original arrays

// Modern alternative: spread operator
const merged2 = [...arr1, ...arr2, ...arr3];
console.log(merged2); // [1, 2, 3, 4, 5, 6]
slice() - Extract Portion
javascriptconst arr = [1, 2, 3, 4, 5];

console.log(arr.slice(2));      // [3, 4, 5] (from index 2)
console.log(arr.slice(1, 4));   // [2, 3, 4] (index 1 to 3)
console.log(arr.slice(-2));     // [4, 5] (last 2)
console.log(arr.slice(-3, -1)); // [3, 4] (from -3 to -1)

// Copy array
const copy = arr.slice();
console.log(copy); // [1, 2, 3, 4, 5]

// ✅ Does NOT mutate original array
console.log(arr); // [1, 2, 3, 4, 5]
join() - Array to String
javascriptconst arr = ['Hello', 'world', '!'];

console.log(arr.join());      // 'Hello,world,!' (default comma)
console.log(arr.join(' '));   // 'Hello world !'
console.log(arr.join('-'));   // 'Hello-world-!'
console.log(arr.join(''));    // 'Helloworld!'

// Reverse with join
const reversed = arr.reverse().join(' ');
console.log(reversed); // '! world Hello'

// CSV format
const data = [['Name', 'Age'], ['Alice', 25], ['Bob', 30]];
const csv = data.map(row => row.join(',')).join('\n');
console.log(csv);
/*
Name,Age
Alice,25
Bob,30
*/

8. Advanced Methods
fill() - Fill with Static Value
javascriptconst arr = [1, 2, 3, 4, 5];

arr.fill(0);
console.log(arr); // [0, 0, 0, 0, 0]

// Fill range
const arr2 = [1, 2, 3, 4, 5];
arr2.fill(9, 1, 4); // Fill index 1 to 3
console.log(arr2); // [1, 9, 9, 9, 5]

// Create initialized array
const zeros = new Array(5).fill(0);
console.log(zeros); // [0, 0, 0, 0, 0]

// ⚠️ Mutates original array!
copyWithin() - Copy Part of Array to Another Location
javascriptconst arr = [1, 2, 3, 4, 5];

// Copy element at index 0 to index 3
arr.copyWithin(3, 0);
console.log(arr); // [1, 2, 3, 1, 2]

// Copy elements 0-2 to position 2
const arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(2, 0, 2);
console.log(arr2); // [1, 2, 1, 2, 5]

// ⚠️ Mutates original array!
from() - Create Array from Iterable
javascript// From string
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
console.log(Array.from({ length: 5 }, (_, i) => i)); // [0, 1, 2, 3, 4]
console.log(Array.from({ length: 5 }, (_, i) => i * 2)); // [0, 2, 4, 6, 8]

// From NodeList (DOM)
const divs = document.querySelectorAll('div');
const divArray = Array.from(divs);
of() - Create Array from Arguments
javascriptconsole.log(Array.of(1, 2, 3)); // [1, 2, 3]
console.log(Array.of(7));       // [7]

// Compare with Array constructor
console.log(Array(7));    // [ <7 empty items> ] (creates array of length 7)
console.log(Array.of(7)); // [7] (creates array with element 7)
isArray() - Check if Array
javascriptconsole.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('hello'));   // false
console.log(Array.isArray({ 0: 'a', length: 1 })); // false
console.log(Array.isArray(null));      // false
at() - Access by Index (Supports Negative)
javascriptconst arr = [1, 2, 3, 4, 5];

console.log(arr.at(0));   // 1
console.log(arr.at(2));   // 3
console.log(arr.at(-1));  // 5 (last element)
console.log(arr.at(-2));  // 4 (second to last)

// Compare with bracket notation
console.log(arr[-1]);     // undefined (doesn't work)
console.log(arr[arr.length - 1]); // 5 (old way)

ES2023 New Methods
toSorted() - Non-Mutating Sort
javascriptconst arr = [3, 1, 2];
const sorted = arr.toSorted();
console.log(arr);    // [3, 1, 2] (unchanged)
console.log(sorted); // [1, 2, 3]
toReversed() - Non-Mutating Reverse
javascriptconst arr = [1, 2, 3];
const reversed = arr.toReversed();
console.log(arr);      // [1, 2, 3] (unchanged)
console.log(reversed); // [3, 2, 1]
toSpliced() - Non-Mutating Splice
javascriptconst arr = [1, 2, 3, 4, 5];
const result = arr.toSpliced(1, 2, 'a', 'b');
console.log(arr);    // [1, 2, 3, 4, 5] (unchanged)
console.log(result); // [1, 'a', 'b', 4, 5]
with() - Non-Mutating Element Update
javascriptconst arr = [1, 2, 3, 4, 5];
const result = arr.with(2, 99);
console.log(arr);    // [1, 2, 3, 4, 5] (unchanged)
console.log(result); // [1, 2, 99, 4, 5]

Quick Reference Cheat Sheet
MethodMutates?ReturnsUse Casepush()✅ YesNew lengthAdd to endpop()✅ YesRemoved elementRemove from endshift()✅ YesRemoved elementRemove from startunshift()✅ YesNew lengthAdd to startsplice()✅ YesRemoved elementsAdd/remove anywheresort()✅ YesSorted arraySortreverse()✅ YesReversed arrayReversefill()✅ YesModified arrayFill with valuecopyWithin()✅ YesModified arrayCopy withinmap()❌ NoNew arrayTransformfilter()❌ NoNew arrayKeep matchingreduce()❌ NoSingle valueAccumulateslice()❌ NoNew arrayExtract portionconcat()❌ NoNew arrayMergeflat()❌ NoNew arrayFlattenflatMap()❌ NoNew arrayMap + flattenfind()❌ NoElement or undefinedFind first matchfindIndex()❌ NoIndex or -1Find first indexindexOf()❌ NoIndex or -1Find indexincludes()❌ NoBooleanCheck existsevery()❌ NoBooleanTest allsome()❌ NoBooleanTest anyforEach()❌ NoundefinedIteratejoin()❌ NoStringTo string

Common Patterns for Interviews
Remove Duplicates:
javascriptconst arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]
Chunk Array:
javascriptconst chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};
console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3)); // [[1, 2, 3], [4, 5, 6], [7]]
Shuffle Array:
javascriptconst shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};
Array Intersection:
javascriptconst intersection = (arr1, arr2) => {
  return arr1.filter(item => arr2.includes(item));
};
console.log(intersection([1, 2, 3], [2, 3, 4])); // [2, 3]

function convert2Sum(str){
   let charMap = { a:1,b:2,c:3,d:4,e:5,f:6, 1:1,2:2,3:3};

  if(str == '') return 0;
  let len =str.length;
  let sum = 0;

  for(let i=0; i<len; i++){
    sum += charMap[str[i].toLowerCase()];  
  }
  /*
  
        // if(str[i] >=0 && str[i] <=9){
        //     //sum += str[i].charCodeAt() - 48;
        // }else{
        //     //sum += str[i].charCodeAt() - 96;
        // }
  */
  return sum ;
}

console.log(convert2Sum('ABCbcdef123'));
