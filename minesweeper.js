input = "BMC_TEST_INPUT_MAGIC"
input = "O O O O X O O O O O\nX X O O O O O O X O\nO O O O O O O O O O\nO O O O O O O O O O\nO O O O O X O O O O";

matrix = null;
rows = 0;
cols = 0;

function createMatrix(dimension, dimensionSize) {
	matrix = new Array(dimension);
	for (i = 0; i < matrix.length; i++) {
		matrix[i] = new Array(dimensionSize);
	}
}

//Read the input, get rows and cols, create the matrix and fill	
function readInput () {
	arrayRows = input.split('\n');
		
	rows = arrayRows.length; 
	cols = arrayRows[0].split(' ').length;
	
	createMatrix(rows, cols);
	
	for (var i = 0; i < rows; i++) {
		currentRow = arrayRows[i].split(' ');
		for (var j = 0; j < currentRow.length; j++) {
			matrix[i][j] = currentRow[j];
		}				
	}		
}

function existsMatrixPosition(row, col) {
	var result = true;
	
	if (matrix[row] === undefined)
		result = false;
	else if (matrix[row][col] === undefined)
		result = false;
	
	return result;
}

function calculateMinesAround(row, col) {
	minesCounter = 0;		
	
	if (existsMatrixPosition(row -1, col - 1) && matrix[row-1][col-1] === 'X') minesCounter++;	//check Up-Left Position
	if (existsMatrixPosition(row -1, col) && matrix[row-1][col] === 'X') minesCounter++;		//check Up Position		
	if (existsMatrixPosition(row -1, col + 1) && matrix[row-1][col + 1] === 'X') minesCounter++;	//check Up-Right Position
	if (existsMatrixPosition(row, col - 1) && matrix[row][col - 1] === 'X') minesCounter++;		//check Left Position
	if (existsMatrixPosition(row, col + 1) && matrix[row][col + 1] === 'X') minesCounter++;		//check Right Position
	if (existsMatrixPosition(row + 1, col - 1) && matrix[row + 1][col - 1] === 'X') minesCounter++;	//check Down-Left Position
	if (existsMatrixPosition(row + 1, col) && matrix[row+1][col] === 'X') minesCounter++;		//check Down Position
	if (existsMatrixPosition(row + 1, col + 1) && matrix[row + 1][col + 1] === 'X') minesCounter++;	//check Down-Right Position
	
	return minesCounter;
}

function isCircle(row, col) {		
	return matrix[row][col] === 'O';
}

//count mines around and replace circles in matrix
function calculateMines() {			
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if (isCircle(i, j)) {
				minesNumber = calculateMinesAround(i, j);
				matrix[i][j] = minesNumber;
			}
		}
	}
}

function printMatrix () {
	var output = "";

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			output += matrix[i][j].toString() + ' ';
		}
		output = output.trim();
		output += '</br>';				
	}

	document.getElementById("result").innerHTML = output;

	console.log(output);
}

window.onload = function(){
	readInput();		
	calculateMines();
	printMatrix();
};
