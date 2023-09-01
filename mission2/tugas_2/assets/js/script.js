let player = document.getElementById("player");
let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
let playerRight = parseInt(window.getComputedStyle(player).getPropertyValue("right"));
let playerWidth = parseInt(window.getComputedStyle(player).getPropertyValue("width"));
let ground = document.getElementById("ground");
let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue("height"));
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue("bottom"));
let isJumping = false;
let upTime;
let downTime;
let posisi = initialPlayerValue();
let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));


function jump(){
    if (isJumping) return;
    upTime = setInterval(() => {
        if (playerBottom > groundHeight + 200){
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
    if (e.key == "38" || e.key == " "){
        jump();
    }
}

document.addEventListener("keydown", control); 

let obstacle = document.getElementById("obstacle");
let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
let obstacleSpeed = 5; // Adjust the speed as needed
let score = 0;

function moveObstacle() {
  obstacleLeft -= obstacleSpeed;
  obstacle.style.left = obstacleLeft + "px";
  console.log(obstacleLeft);
  if(obstacleLeft <= playerLeft+playerWidth-10 &&playerBottom <= 60){
    alert("Game Over");
    playerBottom = posisi[0];
    playerRight = posisi[1];
    playerWidth = posisi[2];
    playerLeft = posisi[3];
    obstacleLeft = window.innerWidth;    
  }
  // Check if the obstacle is out of the screen
  if (obstacleLeft < -50) {
    // Reset the obstacle position when it goes off-screen
    obstacleLeft = window.innerWidth;
    obstacle.style.left = obstacleLeft + "px";
  }
}


// Call moveObstacle every 20 milliseconds
setInterval(moveObstacle, 20);

function initialPlayerValue(){
    let posisi =[]
    let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let playerRight = parseInt(window.getComputedStyle(player).getPropertyValue("right"));
    let playerWidth = parseInt(window.getComputedStyle(player).getPropertyValue("width"));
    let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));

    posisi.push(playerBottom, playerRight, playerWidth, playerLeft);
    return posisi;
}
