const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake;
let food;
let direction;
let score = 0;
let game;
let running = false;

function initGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    score = 0;
    document.getElementById("score").innerText = score;
    createFood();
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

function drawGame() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, 400, 400);

    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ff99" : "#00cc66";
        ctx.fillRect(part.x, part.y, box - 2, box - 2);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box - 2, box - 2);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;

    let newHead = { x: headX, y: headY };

    if (
        headX < 0 || headY < 0 ||
        headX >= 400 || headY >= 400 ||
        snake.some(part => part.x === headX && part.y === headY)
    ) {
        clearInterval(game);
        running = false;
        alert("Game Over! Your Score: " + score);
        return;
    }

    snake.unshift(newHead);

    if (headX === food.x && headY === food.y) {
        score += 10;
        document.getElementById("score").innerText = score;
        createFood();
    } else {
        snake.pop();
    }
}

function startGame() {
    if (running) return;
    running = true;
    game = setInterval(drawGame, 120);
}

function restartGame() {
    clearInterval(game);
    running = false;
    initGame();
    startGame();
}

function changeDirection(newDirection) {
    if (newDirection === "LEFT" && direction !== "RIGHT")
        direction = "LEFT";

    if (newDirection === "RIGHT" && direction !== "LEFT")
        direction = "RIGHT";

    if (newDirection === "UP" && direction !== "DOWN")
        direction = "UP";

    if (newDirection === "DOWN" && direction !== "UP")
        direction = "DOWN";
}

document.addEventListener("keydown", function(event) {
    const keys = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT"
    };

    if (keys[event.key]) {
        event.preventDefault();
        changeDirection(keys[event.key]);
    }
});

initGame();
