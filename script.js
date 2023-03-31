// Set up the game board
const gameBoard = document.getElementById('game-board');
for (let i = 0; i < 20 * 20; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
}

// Initialize the snake
let snake = [{x: 10, y: 10}];
let direction = 'right';

// Handle user input
document.addEventListener('keydown', event => {
    if (event.code === 'KeyW' && direction !== 'down') {
        direction = 'up';
    } else if (event.code === 'KeyA' && direction !== 'right') {
        direction = 'left';
    } else if (event.code === 'KeyS' && direction !== 'up') {
        direction = 'down';
    } else if (event.code === 'KeyD' && direction !== 'left') {
        direction = 'right';
    }
});

// Move the snake
function moveSnake() {
    const head = {x: snake[0].x, y: snake[0].y};
    if (direction === 'up') {
        head.y--;
    } else if (direction === 'left') {
        head.x--;
    } else if (direction === 'down') {
        head.y++;
    } else if (direction === 'right') {
        head.x++;
    }
    snake.unshift(head);
    snake.pop();
}

// Draw the snake
function drawSnake() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('snake'));
    snake.forEach(segment => {
        const index = segment.y * 20 + segment.x;
        cells[index].classList.add('snake');
    });
}

// Handle collisions
function handleCollisions() {
    const head = snake[0];
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        // Snake hit a wall
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            // Snake hit itself
            resetGame();
        }
    }
}

// Update the score
let score = 0;
function updateScore() {
    score++;
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

// Add sound effects
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
oscillator.type = 'square';
oscillator.frequency.value = 440;
oscillator.connect(audioContext.destination);
function playSound() {
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Reset the game
function resetGame() {
    snake = [{x: 10, y: 10}];
    direction = 'right';
    score = 0;
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

// Game loop
setInterval(() => {
    moveSnake();
    drawSnake();
    handleCollisions();
    updateScore();
    playSound();
}, 100);
