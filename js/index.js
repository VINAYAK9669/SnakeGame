// Define intial direction/position
let inputDir = {
  x: 0,
  y: 0,
};
const board = document.getElementById("board");
// Access all the sounds/musics
const foodSound = new Audio("./music/food.mp3");
const moveSound = new Audio("./music/move.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const music = new Audio("./music/music.mp3");
// Display the Score

const displayScoreElement = document.querySelector(".currentScore p span");
const displayHighScore = document.querySelector(".highestScore p span");

// Below varibles will help to control the rendering speed
let speed = 4;
let lastPainTime = 0;
let score = 0;
let highScore = 0;

let snakeArr = [
  {
    x: 13,
    y: 10,
  },
];
let food = { x: 10, y: 15 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);

  // Now we will control the rendering speed using conditional loops
  if ((ctime - lastPainTime) / 1000 < 1 / speed) {
    return;
  }
  lastPainTime = ctime;
  gameEngine();
  6;
}
function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // If you bump to the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  // Updating the snake array and Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    music.pause();

    inputDir = {
      x: 0,
      y: 0,
    };

    snakeArr = [
      {
        x: 13,
        y: 10,
      },
    ];

    if (score > highScore) {
      highScore = score;
      alert("You Scored the highest!");
    } else {
      alert("Game Over! You Scored Less");
    }
    displayHighScore.innerHTML = highScore;
    score = 0;
  }

  // If you the snake eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    // Creating a food within some certain range of the grid area
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  // Moving the Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    // const element = snakeArr[i];
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);

    // Display the snake Food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
  });
  displayScoreElement.innerHTML = `${score}`;
}

// Main logic of game
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  music.play();
  inputDir = { x: 0, y: 0 }; // Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;

      break;

    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});
