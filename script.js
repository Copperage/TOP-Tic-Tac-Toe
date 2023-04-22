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

		//Find out the value of each cell
		const firstNum = gameBoardArr[Math.floor(a / 3)][a % 3];
		const secondNum = gameBoardArr[Math.floor(b / 3)][b % 3];
		const thirdNum = gameBoardArr[Math.floor(c / 3)][c % 3];

		if (firstNum !== '' && firstNum == secondNum && firstNum == thirdNum) {
			winner = firstNum;
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
	[0, 1, 2], // Top row
	[3, 4, 5], // Middle row
	[6, 7, 8], // Bottom row
	[0, 3, 6], // Left column
	[1, 4, 7], // Middle column
	[2, 5, 8], // Right column
	[0, 4, 8], // TL to BR diagonally
	[2, 4, 6], // TR to BL diagonally
];

gameBoard();
