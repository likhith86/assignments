/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str=str.replace(/[^a-zA-Z]/g," ")
  str=str.split(" ").join("");
  str=str.toLowerCase();
  let reverse=[];
  for(let i=str.length-1;i>=0;i--){
    reverse.push(str[i]);
  }
  reverse=reverse.join("");
  return str===reverse;
}

module.exports = isPalindrome;
