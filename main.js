const rows = 20;
const columns = 20;
let mines, remaining, revealed;
let status = document.getElementById('status');

status.addEventListener('click', init)

let board = new Array(rows);
let picture = new Array(rows);
let tile = new Array(rows);

for(let i=0; i<board.length; i++) {
	board[i] = new Array(columns);
	picture[i] = new Array(columns);
	tile[i] = new Array(columns)
}

init()

check = (row,column) => {
	if (column >= 0 && row >= 0 && column < columns && row < rows)
		return board[row][column]
}

init = () => {
	mines = 20;
	remaining = mines;
	revealed = 0;
	status.innerHTML = ("Click on the tiles to reveal them");
	for (let row = 0; row < rows; row++)
		for (let column = 0; column < columns; column++) {
			let index = row * columns + column;
			tile[row][column] = document.createElement('img');
			tile[row][column].src = 'hidden.png';
			tile[row][column].addEventListener('mousedown', click);
			tile[row][column].id = index;
			document.body.appendChild(tile[row][column]);
			picture[row][column] = 'hidden';
			board[row][column] = '';
		}

let placed = 0;
do {
	let column = Math.floor(Math.random() * columns); // randomize columns
	let row = Math.floor(Math.random() * rows); // randomize row contents

	if(board[row][column] != 'mine') {
		board[row][column] = 'mine';
		placed++
	}
} while (placed < mines) // first 20 random spots will be mines

for(let column = 0; column < columns; column++)
	for(let row = 0; row < rows; row++) {
		if (check(row,column) != 'mine') {
			board[row][column] = 
				((check(row + 1, column) == 'mine') | 0) +
				((check(row + 1, column - 1) == 'mine') | 0) +
				((check(row + 1, column + 1) == 'mine') | 0) +
				((check(row - 1, column) == 'mine') | 0) +
				((check(row - 1, column - 1) == 'mine') | 0) +
				((check(row - 1, column + 1) == 'mine') | 0) +
				((check(row, column - 1) == 'mine') | 0) +
				((check(row, column + 1) == 'mine') | 0); //check all surrounding 8 squares for each selection
		}
	}
}

click = (event) => {
	let source = event.target;
	let id = source.id;
	let row = Math.floor(id/columns);
	let column = id % columns;

	if(event.which == 3) {
		switch(picture[row][column]) {
			case 'hidden':
				tile[row][column].src = 'flag.png';
				remaining--;
				picture[row][column] = 'flag';
				break;
			case 'flag':
				tile[row][column].src = 'question.png';
				remaining++;
				picture[row][column] = 'question';
				break;
			case 'question':
				tile[row][column] = 'hidden.png';
				picture[row][column] = 'hidden';
				break;
		}
		event.preventDefault()
	}
	status.innerHTML = 'Mines remaining: ' + remaining;

	
}