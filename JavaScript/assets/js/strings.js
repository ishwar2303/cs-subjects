var str = "It always seems impossible until it's done";

// returns a character at a specified position
console.log(str.charAt(3)); // returns 'a' at index 3

// gives unicode of a character at certain position
console.log(str.charCodeAt(3)); // ascii value of 'a' = 97

// provides the position of the first occurence of a specified text with in a string
// 'seems' found at index 10
console.log(str.indexOf('seems'));

// provides index but of last occurence
console.log(str.lastIndexOf('seems'));

// returns an array of matches based on matching pattern (regular expression)
str = "<div>This is a block <span>Inline Block</span> inside a block</div>";
console.log(str.match(/<\/?[a-z]+>/g));

console.log(str)

// replace matches with the given value
console.log(str.replace(/<\/?[a-z]+>/g, 'HTML'));

// extracts a section of a string and returns new string
console.log(str.slice(5, 9))

// splits a string object and returns an array
console.log(str.split(' ')) // splict string by space

// similar to slice but extracts a substring depending on a specified no of characters
// position from and no of characters from that position
console.log(str.substr(5, 4))

// returns part of string from starting index upto end index
console.log(str.substring(5, 9))

// convert string to lowercase
console.log(str.toLowerCase())

// convert string to uppercase
console.log(str.toUpperCase())

// returns the primitive value (that has no properties or methods of a string object)
console.log(str.valueOf())

