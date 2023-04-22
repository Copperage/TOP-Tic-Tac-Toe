//Query selection
const tttBoxes = document.querySelectorAll('.box');
const tttBoard = document.querySelector('.game-container');
const playerMove = document.querySelector('.whose-turn');

//Game board init
let gameBoardArr = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

let currentPlayer = 'X';

//Set up the gameboard
const gameBoard = () => {
	//Add event listeners to the gameboard
	for (let i = 0; i < tttBoxes.length; i++) {
		tttBoxes[i].addEventListener('click', () => {
			const row = Math.floor(i / 3);
			const col = i % 3;

			if (gameBoardArr[row][col] !== '') {
				return;
			}

			gameBoardArr[row][col] = currentPlayer;

			//Update board
			for (let i = 0; i < tttBoxes.length; i++) {
				const row = Math.floor(i / 3);
				const col = i % 3;
				tttBoxes[i].textContent = gameBoardArr[row][col];
			}

			//Show whose turn it is after event listener is handled
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

			currentPlayer === 'X'
				? (playerMove.textContent = "Player 1's move")
				: (playerMove.textContent = "Player 2's move");

			// Check winner
			const gameResult = checkResult();
			if (gameResult === (draw = true)) {
				playerMove.textContent = "It's a tie!";
			} else if (gameResult) {
				playerMove.textContent = `Player ${gameResult === 'X' ? 1 : 2} wins!`;
				return;
			}
		});
	}
};

const checkResult = () => {
	let winner;
	let draw = true;

	for (let i = 0; i < winningConds.length; i++) {
		const [a, b, c] = winningConds[i];
		if (
			gameBoardArr[a[0]][a[1]] !== '' &&
			gameBoardArr[a[0]][a[1]] === gameBoardArr[b[0]][b[1]] &&
			gameBoardArr[a[0]][a[1]] === gameBoardArr[c[0]][c[1]]
		) {
			winner = gameBoardArr[a[0]][a[1]];
			break;
		}
	}

	for (let i = 0; i < gameBoardArr.length; i++) {
		for (let j = 0; j < gameBoardArr[i].length; j++) {
			if (gameBoardArr[i][j] === '') {
				draw = false;
				break;
			}
		}
	}

	if (draw && !winner) {
		return (draw = true);
	}
	return winner;
};

//Winning conditions
const winningConds = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

gameBoard();
