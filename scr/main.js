let scoreBlock;
let score = 0;

let canvas = document.querySelector("#game_canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game_score .score_count");
drawScore();

const foodimg = new Image();
foodimg.src = "img/food.png";

const config = {
	step: 0,
	maxStep: 6,
	sizeCell: 32,
	sizeBerry: 32 / 4
}

const snake = {
	x:272,
	y: 272,
	dx: 0,
	dy: 0,
	tails: [],
	maxTails: 3
}

let berry = {
	x: 0,
	y: 0
} 

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


let dir;

function gameLoop() {

	requestAnimationFrame( gameLoop );
	if ( ++config.step < config.maxStep) {
		return;
	}
	config.step = 0;

	context.clearRect(0, 0, canvas.width, canvas.height);

	drawBerry();
	drawSnake();
}
requestAnimationFrame( gameLoop );

function drawSnake() {
	snake.x += snake.dx;
	snake.y += snake.dy;

	//collisionBorder();

	// todo бордер
	snake.tails.unshift( { x: snake.x, y: snake.y } );

	if ( snake.tails.length > snake.maxTails ) {
		snake.tails.pop();
	}

	snake.tails.forEach( function(el, index){
		if (index == 0) {
			context.fillStyle = "#FA0556";
		} else {
			context.fillStyle = "#A00034";
		}
		context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

		if ( el.x === berry.x && el.y === berry.y ) {
			snake.maxTails++;
			incScore();
			randomPositionBerry();
		}

		for( let i = index + 1; i < snake.tails.length; i++ ) {

			if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
				refreshGame();
			}

		}

	} );
}

function refreshGame() {
	score = 0;
	drawScore();

	snake.x = 272;
	snake.y = 272;
	snake.tails = [];
	snake.maxTails = 3;
	snake.dx = config.sizeCell;
	snake.dy = 0;

	randomPositionBerry();
}

function randomPositionBerry() {
	berry.x = getRandomInt( 0, canvas.width / config.sizeCell ) * config.sizeCell;
	berry.y = getRandomInt( 0, canvas.height / config.sizeCell ) * config.sizeCell;
}


function drawBerry() {

	context.beginPath();
	context.fillStyle = "#A00034";
	context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
	context.fill();
}




// //создание еды
 
// let food = {
//     x: 0,
//     y: 0,
//     x: Math.floor((Math.random() * 17 + 1)) * box,
//     y: Math.floor((Math.random() * 15 + 3)) * box
// }



// let snake = [];

// snake[0] = {
//     x: 9 * box,
//     y: 10 * box,
// };

// // скорость игры
// let game = setInterval(drawGame, speed);



function randomPositionFood(){

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

// увеличение счета
function incScore() {
	score++;
	drawScore();
}

// отображение на странице
function drawScore() {
	scoreBlock.innerHTML = score;
}

//функция генерации случайных чисел
function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

// function drawGame() {
//     ctx.drawImage(bkground, 0, 0);
//     ctx.drawImage(foodimg, food.x, food.y);


//     // начальная позиция головы
    
//     for (let i = 0; i < snake.length; i++) {
//         ctx.fillStyle = "black";
//         ctx.fillRect(snake[i].x, snake[i].y, box, box);
//     }
//     ctx.fillStyle = "white";
//     ctx.font = "50px Arial";
//     ctx.fillText("Score: ", box, box * 1.5);
//     ctx.fillText(score, box * 6, box * 1.5);
//     let snakeX = snake[0].x;
//     let snakeY = snake[0].y;

//     // съедание еды
//     if (snakeX == food.x && snakeY == food.y) {
//         incScore();
//         eat.play();
//         food = {
//             x: Math.floor((Math.random() * 17 + 1)) * box,
//             y: Math.floor((Math.random() * 15 + 3)) * box,
//         };
//     }
//     else {
//         snake.pop();
//     }

//    // выход за границы поля
//    // crossingBorder();
//     if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
//         clearInterval(game);
//         dead.play();
//     }

//     // движение змеи
//     if (dir == "left")
//         snakeX = (snakeX - box);
//     if (dir == "right")
//         snakeX = snakeX + box;
//     if (dir == "up")
//         snakeY = snakeY - box;
//     if (dir == "down")
//         snakeY = snakeY + box;
//     let newElementSnake = {
//         x: snakeX,
//         y: snakeY
//     };

//     eatTail(newElementSnake, snake);
//     snake.unshift(newElementSnake);
// }