// Variáveis globais
let currentPlayer, player1, player2;
let board = ['', '', '', '', '', '', '', '', ''];
let scores = {
    'X': 0,
    'O': 0
};

// Elementos do DOM
const playerForm = document.getElementById('playerForm');
const gameBoard = document.getElementById('game');
const scoresContainer = document.getElementById('scores');

// Função para iniciar o jogo
function startGame(event) {
    event.preventDefault();
    player1 = playerForm.elements['player1'].value.trim();
    player2 = playerForm.elements['player2'].value.trim();

    currentPlayer = 'X'; // Começa com o jogador X

    // Limpa o formulário
    playerForm.reset();

    // Exibe o tabuleiro
    renderBoard();
}

// Função para renderizar o tabuleiro
function renderBoard() {
    gameBoard.innerHTML = '';
    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.textContent = cell;
        cellDiv.addEventListener('click', () => cellClick(index));
        gameBoard.appendChild(cellDiv);
    });
}

// Função para a jogada do jogador
function cellClick(index) {
    if (board[index] === '') {
        board[index] = currentPlayer;
        renderBoard();
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Troca o jogador
    }
}

// Função para verificar se há um vencedor
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
        [0, 4, 8], [2, 4, 6] // diagonais
    ];

    let winner = null;
    winConditions.forEach((condition) => {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
        }
    });

    if (winner) {
        alert(`Jogador ${winner} venceu!`);
        scores[winner]++;
        updateScores();
        resetBoard();
    } else if (board.every(cell => cell !== '')) {
        alert('Empate!');
        resetBoard();
    }
}

// Função para atualizar as pontuações na interface
function updateScores() {
    scoresContainer.innerHTML = `
        <h2>Pontuações</h2>
        <table>
            <tr>
                <th>${player1}</th>
                <th>${player2}</th>
            </tr>
            <tr>
                <td>${scores['X']}</td>
                <td>${scores['O']}</td>
            </tr>
        </table>
    `;
}

// Função para resetar o tabuleiro
function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
}

// Event listener para iniciar o jogo ao enviar o formulário
playerForm.addEventListener('submit', startGame);
