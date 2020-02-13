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
  // this function is also used by findNQueensSolution to create an array of possible "next moves".
  var count = 0;

  var matrix = [];

  while (count < n) {
    var currRow = window.zeroArrayMaker(n);
    currRow[count] = 1;
    matrix.push(currRow);
    count++;
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

// Helper function creating an array of possible moves for board of size n.
// e.g. for 4, it returns [[[1, 0 , 0, 0]], [[0, 1, 0, 0]], [[0, 0, 1, 0]], [[0, 0, 0, 1]]]
window.createBoardsToTry = function(n) {
  var count = 0;

  var result = [];

  while (count < n) {
    var currRow = window.zeroArrayMaker(n);
    currRow[count] = 1;
    result.push([currRow]);
    count++;
  }

  return result;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // I'm going to create an array of all possible first moves -- all the places a queen can be on the first row.
  // Conveniently, we can do this with our already written findNRooksSolution.
  var boardsToTry = window.createBoardsToTry(n);
  var nextMoves = window.findNRooksSolution(n);

  // Helper function that creates an array of next possible moves if they are valid boards
  var createNextLegalMoves = function(currBoard) {
    var nextLegalMoves = [];
    for (var move of nextMoves) {
      var boardToCheck = currBoard;
      boardToCheck.push(move);
      if (checkIfConflicts(boardToCheck) === false) {
        nextLegalMoves.push(boardToCheck);
      }
    }
    return nextLegalMoves;
  }

  // At every step, I'm going to splice out that board and add up to 8 boards in its place: the 8 boards representing 8 possible "next moves"

  for (var i = 0; i < boardsToTry.length; i++) {
    if (boardsToTry[i].length === n) {
      var solution = boardsToTry[i];
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      return solution;
    }
    boardsToTry.splice(i, 1, ...createNextLegalMoves(boardsToTry[i]));
  }



  // if there are no possible next moves, the board is simply spliced out and not replaced by anything.
  // when we would splice in a matrix of length n with no conflicts, we have found a solution, so we can halt.

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
