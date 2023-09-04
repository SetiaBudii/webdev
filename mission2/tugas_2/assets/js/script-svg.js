let player = document.querySelector(".player-svg");
let ground = document.querySelector(".ground")
let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue("height"));
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
        if (playerBottom > groundHeight + 200){
            clearInterval(upTime);
            downTime = setInterval(() => {
                if (playerBottom <= 60 ){
                    clearInterval(downTime);
                    isJumping = false;
                    score += 1;
                    runKM.innerText = score; 
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

document.addEventListener("keydown", control); 

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
  