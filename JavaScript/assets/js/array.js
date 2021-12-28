var arr = ['apple', 'banana', 'mango', 'grapes', 'strawberry', 'orange', 'watermelon', 'orange', 'mango'];

// print array
console.log(arr);

// Returns the first position at which a given element appears in an array
let i = arr.indexOf('mango');
console.log(i);

// Returns the last position at which a given element appears in an array
i = arr.lastIndexOf('orange');
console.log(i);

// Insert element at the end
arr.push('papaya');
console.log(arr);

// Removes last element of an array
arr.pop();
console.log(arr);

// Insert element at the beginning
arr.unshift('papaya');
console.log(arr);

// Removes first element of an array
arr.shift();
console.log(arr);

// reverse an array
arr.reverse();
console.log(arr);

// Pulls a copy of a portion of an array
var newArray = arr.slice(3, 7);
console.log(newArray);

// returns primitive value of the object
console.log(arr.valueOf()) // as it is array, so array will be returned

// combine elments of an array into a single string separated with delimeter
// default delimeter is comma
console.log(arr.join())
console.log(arr.join('-'))

// convert elements to strings
console.log(arr.toString())

// add and removes elements
// splice(index, howmany, items...)
console.log(arr)
arr.splice(2, 3, 'pineapple', 'pomegranate')
console.log(arr)

// concat two arrays and returns new array
let a = [1, 2, 3, 4, 5]
let b = [6, 7, 8, 9, 10]
console.log(a.concat(b))
console.log(a)
console.log(b)

