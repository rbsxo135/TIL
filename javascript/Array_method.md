# JavaScript Array Method

## Concept
- Most array methods below take a **callback** with the signature (element, index, array)
- None of them require a separate loop, index variable, or explicit break in most cases
- They return a **new value** instead of mutating the array, except sort (and reverse, splice)

### find, findIndex
- find returns the **first matching element**, or undefined if nothing matches
- findIndex returns the **index** of the first matching element, or -1 if nothing matches
- Both stop iterating as soon as a match is found (short-circuit)
- Equivalent to a for loop with an if and a break, but without the loop boilerplate

### some, every
- some returns true if **at least one** element satisfies the callback, false otherwise
- every returns true only if **all** elements satisfy the callback
- Both short-circuit: some stops at the first true, every stops at the first false
- some on an empty array is false, every on an empty array is true (vacuous truth)

### filter
- Returns a **new array** containing every element for which the callback is true
- Always iterates the whole array, does not short-circuit
- Returns an empty array when nothing matches, never undefined

### reduce
- Folds the array into a **single value** by repeatedly applying (accumulator, element) to callback
- Signature: array.reduce(callback, initialValue)
    - callback receives (accumulator, element, index, array)
    - initialValue is optional, but omitting it uses the first element as the accumulator and skips it in the first callback call
- Can implement sum, max, grouping, flattening, or even map/filter with a single pass
- The most general of these methods, every other one above could be written using reduce

### Comparison
| Method | Returns | Stops early | Empty array result |
|---|---|---|---|
| find | element or undefined | yes | undefined |
| findIndex | index or -1 | yes | -1 |
| some | boolean | yes (on true) | false |
| every | boolean | yes (on false) | true |
| filter | new array | no | empty array |
| reduce | any single value | no | initialValue, or error without one |

## Configure

### sort
- sort **mutates the original array** and also returns it
- Without a comparator, elements are converted to strings and sorted **lexicographically**  
    &rightarrow; [10, 2, 1].sort() gives [1, 10, 2], not [1, 2, 10]
- A comparator function decides the order: (a, b) greater than 0 means a comes after b
    - Ascending numbers: (a, b) &rightarrow; a - b
    - Descending numbers: (a, b) &rightarrow; b - a
- To sort without mutating the original, copy the array first with spread, then sort the copy

### Array spread
- The spread syntax (...) expands an array into individual elements
- Common uses
    - Copy an array without mutating the original: const copy = [...original]
    - Merge arrays: const merged = [...arrayA, ...arrayB]
    - Insert an element without mutation: const inserted = [...arr, newItem]
    - Pass array elements as separate arguments: Math.max(...numbers)
- Spread only copies one level deep (shallow copy)  
    &rightarrow; Nested arrays or objects inside are still shared by reference
- Pairing spread with sort, filter, or map keeps the original array untouched, which avoids bugs from hidden mutation

## Thoughts
- find/findIndex/some/every/filter cover almost every case where I used to reach for a for loop with an if statement
- reduce feels the most powerful but also the least readable at first  
    &rightarrow; I only reach for it when the result genuinely needs to be a single accumulated value, otherwise filter or map reads better
- sort mutating in place surprised me the most, since filter, map, and the rest all return new arrays  
    &rightarrow; I now always assume a method mutates until I check the docs
- The default lexicographic sort is a trap for number arrays  
    &rightarrow; I need to remember the comparator every single time, forgetting it produces a wrong result silently, not an error
- Spread plus these methods removes almost every reason to mutate an array directly
