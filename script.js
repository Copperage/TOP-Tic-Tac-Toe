// Query selection
const tttBoxes = document.querySelectorAll('.box');
const tttBoard = document.querySelector('.game-container');

//Game board init
let gameBoardArr = [
	['1', '2', '3'],
	['4', '5', '6'],
	['7', '8', '9'],
];

//Set up the gameboard
const gameBoard = () => {
	for (let i = 0; i < tttBoxes.length; i++) {
		const row = Math.floor(i / 3);
		const col = i % 3;
		tttBoxes[i].textContent = gameBoardArr[row][col];
	}
};

gameBoard();
