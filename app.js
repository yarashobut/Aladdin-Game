const aladdin = $(".aladdin");
const grid = $(".grid");
const alert = $("#alert");
let gravity = 0.9;
let isJumping = false;
let isGameOver = false;
let position = 5;

var alive = new Audio("audios/arabian.mp3");
var dead = new Audio("audios/wrong.mp3");

function control(e) {
    if (e.code === "Space" && !isJumping && !isGameOver) {
        jump();
    }
    alive.play();
}

$(document).on("keydown", control); 

function jump() {
    isJumping = true;
    let count = 0;
    let timerId = setInterval(function() {
        //move down
        if (count === 30) {
            clearInterval(timerId);
            let downTimerId = setInterval(function() {
                if (count === 5) {
                    clearInterval(downTimerId);
                    isJumping = false;
                }
                position -=1;
                count--;
                position = position * gravity;
                aladdin.css("bottom", position + "%");
            }, 30);
        }

        //move up
        position += 7;
        count++;
        position = position * gravity;
        aladdin.css("bottom",  position + "%");
    }, 20);
}


function generateObstacles() {
    if (!isGameOver){
        let minInterval = 1500;  
        let maxInterval = 4000;  
        let randomTime = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval; 
        const obstacle = $("<div></div>").addClass("obstacle");
        grid.append(obstacle);

        let obstaclePosition = 1000;
        obstacle.css("left", obstaclePosition + "px");

        let timerId = setInterval(function() {
            obstaclePosition -= 10;
            obstacle.css("left", obstaclePosition + "px");

            let aladdinBottom = parseFloat(aladdin.css("bottom"));
            let aladdinHeight = aladdin.height();
            let obstacleLeft = obstaclePosition;
            let obstacleWidth = obstacle.width();

            if (obstacleLeft > 0 && obstacleLeft < 250 && aladdinBottom < 210) {
                if (aladdinBottom + aladdinHeight > 10 && aladdinBottom < 200) {
                    clearInterval(timerId);
                    isGameOver = true;
                    alive.pause();
                    dead.play();
                    alert.text("Game Over");
                    alert.css("padding-left", "30%");
                    // Remove all children
                    grid.empty();
                    return;
                }
            }
           
            if (obstaclePosition <-200){
                clearInterval(timerId);
                obstacle.remove();
            }
        }, 20);
        setTimeout(generateObstacles, randomTime);
    }
}

setTimeout(generateObstacles);  




