
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

  startButton = document.querySelector("#startbut");
  startBlock = document.querySelector("#start");
  mobileBtn = document.querySelector("moveButtons");
  gameW = document.querySelector("#gameW")
  startButton.onclick = function() {
  startGame()
}

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;

let score = 0;

let name = 0;


let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;
function direction(event) {
  if(event.keyCode == 37 && dir != "right" )
    dir = "left";
  else if(event.keyCode == 38 && dir != "down" )
    dir = "up";
  else if(event.keyCode == 39 && dir != "left" )
    dir = "right";
  else if(event.keyCode == 40 && dir != "up" )
    dir = "down";
}


function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      endGame();
    }
      
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else
    snake.pop();

  if (snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game);
    endGame();
  }

  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up") snakeY -= box;
  if(dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}
let game = setInterval(drawGame, 200);
//=====================Start========================

function startGame() {
  startBlock.style.display = "none";
  gameW.style.display = "block";

}

// =======================Вікно рестарту=====================
function endGame() {
  gameW.style.display = "none";//вимикаємо ігрове поле
  //Отримання наших результатів "score" та виведення їх у вікні
  let scoreBlock = document.querySelector("#end h3 span");
    scoreBlock.innerText = score;    

  let endW = document.querySelector("#end");
      endW.style.display = "block";//відображаєм вікно про поразку
  let restartButton = document.querySelector("#restart");
  //перезавантажити сторінку при натиску на кнопку
      restartButton.onclick = restart; 
}
function restart() {
  location.reload();
}
// =========================================================


$(function(){
    $('#startbut').on('click', function(){
        var userName = $(this).data('NickName'); // id колонки в базі даних
        $.ajax({
            url: 'handler.php', // шлях до обробника
            type: 'POST', // метод передачі данних POST || GET
            dataType: 'json', // формат даних які очікуються у відповідь
            data: {NickName: userName}, // данні які передаються {ключ1 : значення1, ключ2 : значення2}
            success: function(data){ //при вдалому запиту до сервера
                // в змінній data - відповідь сервера
                if(data){
                    $('#output').html(data); // вивід статті в потрібний блок
                }
            }
        });
    });
});
