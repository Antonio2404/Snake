var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

const bkground = new Image();
bkground.src = "img/background.png";

const foodimg = new Image();
foodimg.src = "img/food.png";

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "song/dead.mp3"
eat.src = "song/eat.mp3"
up.src = "song/up.mp3"
left.src = "song/left.mp3"
right.src = "song/right.mp3"
down.src = "song/down.mp3"

let box = 32;

let scoreBlock;
let score = 0;

let speed = 200;

let dir;

//создание еды
 
let food = {
    x: 0,
    y: 0,
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
}



let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

// скорость игры
let game = setInterval(drawGame, speed);

// отслеживание нажатий 
document.addEventListener("keydown", function(e){
    if (e.code == "ArrowLeft" && dir != "right") {
        dir = "left"; left.play();
    } else if (e.code == "ArrowUp" && dir != "down") {
        dir = "up"; up.play();
    } else if (e.code == "ArrowRight" && dir != "left") {
        dir = "right"; right.play();
    } else if (e.code == "ArrowDown" && dir != "up") {
        dir = "down"; down.play();
    }
});

function randomPositionFood(){

}

//функция генерации случайных чисел
function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

//встреча головы и хвоста

function eatTail(head, arrSnake) {
    for (let i = 0; i < arrSnake.length; i++) {
        if (head.x == arrSnake[i].x && head.y == arrSnake[i].y) {
            dead.play();
            clearInterval(game);
        }
    }
}
//выход за границу поля
function crossingBorder(){
    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
        clearInterval(game);
        dead.play();
    }

}

function incScore() {
	score++;
	//drawScore();
}

function drawGame() {
    ctx.drawImage(bkground, 0, 0);
    ctx.drawImage(foodimg, food.x, food.y);


    // начальная позиция головы
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("Score: ", box, box * 1.5);
    ctx.fillText(score, box * 6, box * 1.5);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // съедание еды
    if (snakeX == food.x && snakeY == food.y) {
        incScore();
        eat.play();
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    }
    else {
        snake.pop();
    }

   // выход за границы поля
   // crossingBorder();
    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
        clearInterval(game);
        dead.play();
    }

    // движение змеи
    if (dir == "left")
        snakeX = (snakeX - box);
    if (dir == "right")
        snakeX = snakeX + box;
    if (dir == "up")
        snakeY = snakeY - box;
    if (dir == "down")
        snakeY = snakeY + box;
    let newElementSnake = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newElementSnake, snake);
    snake.unshift(newElementSnake);
}