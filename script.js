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

			//Show whose turn it is after event listener is handled
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

			currentPlayer === 'X'
				? (playerMove.textContent = "Player 1's move")
				: (playerMove.textContent = "Player 2's move");

			//Update board
			for (let i = 0; i < tttBoxes.length; i++) {
				const row = Math.floor(i / 3);
				const col = i % 3;
				tttBoxes[i].textContent = gameBoardArr[row][col];
			}
		});
	}
};

gameBoard();
