const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const boardSize = 20;
const size = canvas.width / boardSize;
let snake = [{ head: '<', x: 12, y: 13 }, { head: '*', x: 12, y: 14 }, { head: '#', x: 12, y: 15 }];
let fruit = { fruitx: Math.floor(Math.random() * 18) + 1, fruity: Math.floor(Math.random() * 18) + 1 };
let score = 0;
let direction = '';
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (i === 0 || i === boardSize - 1 || j === 0 || j === boardSize - 1) {
                ctx.fillRect(j * size, i * size, size, size);
            }
        }
    }
    snake.forEach(part => {
        ctx.fillStyle = part.head === '<' ? 'red' : 'green';
        ctx.fillRect(part.y * size, part.x * size, size, size);
    });
    ctx.fillStyle = 'blue';
    ctx.fillRect(fruit.fruity * size, fruit.fruitx * size, size, size);
}

function moveSnake() {
    const tail = snake.pop();
    switch (direction) {
        case 'w':
            if ('w' != 's') {
                tail.x = snake[0].x - 1;
                tail.y = snake[0].y;
                break;
            }
        case 's':
            if ('s' != 'w') {
                tail.x = snake[0].x + 1;
                tail.y = snake[0].y;
                break;
            }
        case 'a':
            if ('a' != 'd') {
                tail.x = snake[0].x;
                tail.y = snake[0].y - 1;
                break;
            }
        case 'd':
            if ('d' != 'a') {
                tail.x = snake[0].x;
                tail.y = snake[0].y + 1;
                break;
            }
        default:
            snake.push(tail);
            return;
    }
    snake.unshift(tail);

    if (snake[0].x === fruit.fruitx && snake[0].y === fruit.fruity) {
        score += 5;
        snake.push({ head: '#', x: tail.x, y: tail.y });
        fruit.fruitx = Math.floor(Math.random() * 18) + 1;
        fruit.fruity = Math.floor(Math.random() * 18) + 1;
    }

    if (snake[0].x === 0 || snake[0].x === boardSize - 1 || snake[0].y === 0 || snake[0].y === boardSize - 1) {
        alert("Game Over! Score: " + score);
        document.removeEventListener('keydown', handleKeydown);
        return;
    }

    drawBoard();
}

function handleKeydown(event) {
    switch (event.key) {
        case 'w':
            direction = 'w';
            break;
        case 's':
            direction = 's';
            break;
        case 'a':
            direction = 'a';
            break;
        case 'd':
            direction = 'd';
            break;
    }
}

document.addEventListener('keydown', handleKeydown);
setInterval(moveSnake, 200);
drawBoard();