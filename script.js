//Query selection
const tttBoxes = document.querySelectorAll('.box');
const tttBoard = document.querySelector('.game-container');
const playerMove = document.querySelector('.whose-turn');
const modalBox = document.querySelector('.name-entry');
const p1Input = document.getElementById('player1');
const p2Input = document.getElementById('player2');
const startButton = document.getElementById('start');

//Game board init
let gameBoardArr = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

let currentPlayer = 'X';

//Pre-setup
startButton.addEventListener('click', () => {
	const p1Name = p1Input.value;
	const p2Name = p2Input.value;

	playerMove.textContent = `${p1Name}'s move`;

	modalBox.classList.add('fade-anim');
	tttBoard.classList.remove('container-blur');

	setTimeout(() => {
		modalBox.style.display = 'none';
	}, 260);

	event.preventDefault();
	gameBoard(p1Name, p2Name);
});

//Set up the gameboard
const gameBoard = (p1Name, p2Name) => {
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

			playerMove.textContent = `${p1Name}'s move`;

			currentPlayer === 'X'
				? (playerMove.textContent = `${p1Name}'s move`)
				: (playerMove.textContent = `${p2Name}'s move`);

			// Check winner
			const gameResult = checkResult();
			if (gameResult === (draw = true)) {
				playerMove.textContent = "It's a tie!";
			} else if (gameResult) {
				playerMove.textContent = `${
					gameResult === 'X'
						? (playerMove.textContent = `${p1Name}`)
						: (playerMove.textContent = `${p2Name}`)
				} wins!`;
				return;
			}
		});
	}
};

//Winner conditions and algo
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

modalBox.style.display = 'flex';
modalBox.classList.remove('fade-anim');
tttBoard.classList.add('container-blur');
