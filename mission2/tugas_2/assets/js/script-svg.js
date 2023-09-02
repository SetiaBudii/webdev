let player = document.querySelector(".player-svg");
let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
let gameIsOver = false;
let isJumping = false;
let upTime;
let downTime;
let score = 0;
let runKM = document.getElementById("Score");
let initialCatPosition = initialPlayerValue();

//Jumping
function jump(){
    if (isJumping) return;
    upTime = setInterval(() => {
        if (playerBottom > 50 + 200){
            clearInterval(upTime);
            downTime = setInterval(() => {
                if (playerBottom <= 60 ){
                    clearInterval(downTime);
                    isJumping = false;
                }
                playerBottom -= 10;
                player.style.bottom = playerBottom  + "px";
            }, 20);
            return;
        }   
        playerBottom += 10;
        player.style.bottom = playerBottom  + "px";
        isJumping = true;
    }, 20);
}

function control(e){
    if (e.key == "ArrowUp" || e.key == " "){
        jump();
    }
}


let obstacle = document.querySelector(".obstacle-svg");

function isCollision(rect1, rect2) {
    const rect1Box = rect1.getBoundingClientRect();
    const rect2Box = rect2.getBoundingClientRect();
    
    return (
      rect1Box.left < rect2Box.right &&
      rect1Box.right > rect2Box.left &&
      rect1Box.top < rect2Box.bottom &&
      rect1Box.bottom > rect2Box.top
    );
  }

document.addEventListener("keydown", control); 

function checkCollision() {
    if (isCollision(player, obstacle) && !gameIsOver) {
      gameIsOver = true;
      showGameOverMessage();
      resetGame();
    }
  
    if (!gameIsOver) {
      score++;
      runKM.innerHTML = score + " meter meng berjalan!";
      requestAnimationFrame(checkCollision);
    }
  }
  
function showGameOverMessage() {
    // Display a game over message or perform any other game over actions
    alert("Yahhh si meng nabrak!");
  }
  
  function resetGame() {
    player.style.bottom = initialCatPosition[1] + "px";
    player.style.left = initialCatPosition[0] + "px";
    gameIsOver = false;
    score = 0;
    obstacle.style.height =50 + "px";
  }
  
  function initialPlayerValue(){
    let position =[]
    let player = document.querySelector(".player-svg");
    let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    position.push(playerLeft);
    position.push(playerBottom);

    return position;
  }

  function randomHeightObstacle(){
    obstacle.style.height = Math.floor(Math.random() * (180 - 50 + 1) + 50) + "px";
    obstacle.style.backgroundColor = getRandomColor();
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
  
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  
    return color;
  }

  setInterval(randomHeightObstacle, 2000);
  document.addEventListener("keydown", control);
  
  // Start the collision detection loop
  requestAnimationFrame(checkCollision);