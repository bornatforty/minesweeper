const rows = 20;
const columns = 20;
let ghosts, remaining, revealed;
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
	ghosts = 20;
	remaining = mines;
	revealed = 0;
	status.innerHTML = ("Click on the tiles to reveal them");
	for (let row = 0; row < rows; row++)
		for (let column = 0; column < columns; column++) {
			let index = row * columns + column;
			tile[row][column] = document.createElement('img');
			tile[row][column].src = 'grave.png';
			tile[row][column].addEventListener('mousedown', click);
			tile[row][column].id = index;
			document.body.appendChild(tile[row][column]);
			picture[row][column] = 'grave';
			board[row][column] = '';
		}

let placed = 0;
do {
	let column = Math.floor(Math.random() * columns); // randomize columns
	let row = Math.floor(Math.random() * rows); // randomize row contents

	if(board[row][column] != 'ghost') {
		board[row][column] = 'ghost';
		placed++
	}
} while (placed < ghosts) // first 20 random spots will be mines

for(let column = 0; column < columns; column++)
	for(let row = 0; row < rows; row++) {
		if (check(row,column) != 'ghost') {
			board[row][column] = 
				((check(row + 1, column) == 'ghost') | 0) +
				((check(row + 1, column - 1) == 'ghost') | 0) +
				((check(row + 1, column + 1) == 'ghost') | 0) +
				((check(row - 1, column) == 'ghost') | 0) +
				((check(row - 1, column - 1) == 'ghost') | 0) +
				((check(row - 1, column + 1) == 'ghost') | 0) +
				((check(row, column - 1) == 'ghost') | 0) +
				((check(row, column + 1) == 'ghost') | 0); //check all surrounding 8 squares for each selection
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
			case 'grave':
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
				tile[row][column] = 'grave.png';
				picture[row][column] = 'grave';
				break;
		}
		event.preventDefault()
	}
	status.innerHTML = 'Ghosts remaining: ' + remaining;

	if(event.which == 1 && picture[row][column] != 'flag') {
		if(board[row][column] == 'ghost') {
			for(let row = 0; row < rows; row++)
				for(let column = 0; column < columns; column++) {
					if(board[row][column] == 'ghost') {
						tile[row][column].src = 'ghost.png';
					}
					if(board[row][column] != 'ghost' && picture[row][column] == 'flag') {
						tile[row][column].src = 'ghostx.png'
					}
				}
	status.innerHTML = 'Game Over.  Click here to restart'
		}
		else if(picture[row][column] == 'grave') reveal(row, column)
	}

	if(revealed == rows*columns - ghosts)
	status.innerHTML = "You win! Click here to play again!"
}

reveal = (row, column) => {
	tile[row][column].src = board[row][column] + '.png'
	if(board[row][column] != 'ghost' && picture[row][column] == 'grave')
		revealed++
		picture[row][column] = board[row][column]

	if(board[row][column] == 0) {
		if(column > 0 && picture[row][column - 1] == 'grave') reveal(row,column-1);
		if(column < (columns - 1) && picture[row][+column + 1] == 'grave') reveal(row, +column + 1);
		if(row < (rows - 1) && picture[+row + 1][column] == 'grave') reveal(+row + 1, column);
		if(row > 0 && picture[row - 1][column] == 'grave') reveal(row - 1, column);
		if(column > 0 && row > 0 && picture[row - 1][column - 1] == 'grave') reveal(row - 1, column - 1);
		if(column > 0 && row < (rows - 1) && picture[+row + 1][column - 1] == 'grave') reveal(+row + 1, column - 1);
		if(column < (columns - 1) && row < (rows - 1) && picture[+row + 1][+column + 1] == 'grave') reveal(+row + 1, +column + 1);
		if(column < (columns - 1) && row > 0 && picture[row - 1][+column + 1] == 'grave') reveal(row - 1, +column + 1);

	}
}