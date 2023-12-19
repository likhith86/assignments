/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    function calculate(a,b){
        return a-b;
    }
    let largest=numbers.sort(calculate)[numbers.length-1];
    return largest;
}

module.exports = findLargestElement;