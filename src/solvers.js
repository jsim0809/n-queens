/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.checkIfConflicts = function(matrix) {
  // returns boolean representing if a matrix or partial matrix has no conflicts (for placed queens)
  // a partial matrix is just the first few rows of an n-sized board.
  var matrixCopy = matrix.slice();
  var rowsToAdd = matrix[0].length - matrix.length;
  while (rowsToAdd) {
    matrixCopy.push(window.zeroArrayMaker(matrix[0].length));
    rowsToAdd--;
  }
  var board = new Board(matrixCopy);
  return board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts();
};


window.zeroArrayMaker = function(num) {
  var result = [];
  while (num > 0) {
    result.push(0);
    num--;
  }
  return result;
};

window.findNRooksSolution = function(n) {
  // returns a MATRIX, not a Board.
  var count = n;

  var matrix = [];

  while (count > 0) {
    var currRow = window.zeroArrayMaker(n);
    currRow[count-1] = 1;
    matrix.push(currRow);
    count--;
  }

  var solution = matrix;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var factorial = function(n) {
    if (n === 1) {
      return 1;
    } else {
      return n * factorial(n-1);
    }
  };
  var solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // I'm going to create an array of all possible first moves -- all the places a queen can be on the first row.
  // At every step, I'm going to


  var solution = undefined;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
