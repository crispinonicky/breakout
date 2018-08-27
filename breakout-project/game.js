// console.log("test1");

var canvas = document.getElementById('myCanvas').getContext('2d')

var canvas2 =document.getElementById('myCanvas')

var ballRadius = 10;

var bulletRadius = 7;

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            canvas.beginPath();
            canvas.rect(brickX, brickY, brickWidth, brickHeight)
            // console.log(brickX+ brickY);
            canvas.fillStyle = "#00dd67"
            // canvas.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
            canvas.fill();
            canvas.closePath();
          }
        }
    }
}

function drawOuterBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<outerRowCount; r++) {
          if(outerBricks[c][r].status == 1) {
            var outerBrickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var outerBrickY = (r*(brickHeight+brickPadding) + (brickRowCount * (brickPadding + brickHeight)))+brickOffsetTop;
            outerBricks[c][r].x = outerBrickX;
            outerBricks[c][r].y = outerBrickY;
            canvas.beginPath();
            canvas.rect(outerBrickX, outerBrickY, brickWidth, brickHeight)
            // console.log(brickX+ outerBrickY);
            canvas.fillStyle = "green"
            // canvas.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
            canvas.fill();
            canvas.closePath();
          }
        }
    }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var color = "#00dd67"
// #00dd67"
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var brick = bricks[c][r];
            if(brick.status ===1){
              if(x > brick.x && x < brick.x+brickWidth && y > brick.y && y < brick.y+brickHeight) {
                color = getRandomColor();
                dy = -dy;
                brick.status = 0
                score++
                if(score === (outerRowCount + brickRowCount) * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                }
              }

            }
        }
    }
}

function outerCollisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<outerRowCount; r++) {
            var outerBrick = outerBricks[c][r];
            if(outerBrick.status ===1){
              if(x > outerBrick.x && x < outerBrick.x+brickWidth && y > outerBrick.y && y < outerBrick.y+brickHeight) {
                color = getRandomColor();
                dy = -dy;
                outerBrick.status = 0
                score++
                if(score === outerRowCount*brickColumnCount + outerRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                }
              }

            }
        }
    }
}


function drawBall(){

  canvas.beginPath();
  canvas.arc(x, y, ballRadius, 0, Math.PI*2);
  canvas.fillStyle = getRandomColor();
  canvas.fill();
  canvas.closePath();
}

function drawBullet(){

    canvas.beginPath();
    canvas.arc(bulletX, y, ballRadius, 0, Math.PI*2);
    canvas.fillStyle = "red";
    canvas.fill();
    canvas.closePath();
  }

function drawPaddle() {
    canvas.beginPath();
    canvas.rect(paddleX, canvas2.height-paddleHeight, paddleWidth, paddleHeight);
    canvas.fillStyle = "#0095DD";
    canvas.fill();
    canvas.closePath();
}

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("space", bullet, false);

function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

// function bullet(e) {
//     if (e.keyCode === 32) {
//         alert('BANG');
//     }
// }

document.onkeydown = function(e) {
    if (e.keyCode === 32) {
        // alert("working");
        drawBullet()
    }
  };

function drawScore() {
    canvas.font = "16px Arial";
    canvas.fillStyle = "#0095DD";
    canvas.fillText("Score: "+score, 8, 20);
}


// var canvas = document.getElementById("canvas");
// // var canvas = canvas.getContext("2d");
// canvas.beginPath()
// canvas.rect(20, 40, 50, 50)
// canvas.fillStyle = 'blue'
// canvas.fill()
// canvas.stroke()
// canvas.closePath
// //
// //
// //
// canvas.beginPath();
// canvas.arc(240, 160, 20, 0, Math.PI*2 , false);
// canvas.fillStyle = "green";
// canvas.fill();
// canvas.closePath();
//
// //
// canvas.beginPath();
// canvas.rect(160, 10, 100, 40);
// canvas.strokeStyle = "rgba(0, 0, 255, 0.5)";
// canvas.stroke();
// canvas.closePath();
