canvas = document.getElementById("myCanvas")
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

//ctx.fillRect(20, 20, 150, 100);

const keys = [];

const tileLength = 50;

let fps = 20;

const player = {
    x: 9,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 10,
    moving: false
}

const playerSprite = new Image();
playerSprite.src = "usagitsukino.png";
playerSprite.onload = function(){
    drawSprite(playerSprite, player.frameX*player.width, player.frameY*player.height, player.width, player.height, player.x, player.y, player.width, player.height)
}

function drawSprite (img, sX, sY, sW, sH, dx, dy, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dx, dy, dW, dH);
}

//Key Listener Functions
window.addEventListener("keydown", function(e){
    console.log(e)
    keys[e.key] = true
    console.log(keys)
})
window.addEventListener("keyup", function(e){

    delete keys[e.key];
    
})

// //Move Player function that uses speed to move
// function movePlayer() {
//     if ((keys['ArrowRight'] || keys['Right']) && player.x < (canvas.width - player.width)) {
//         player.x += player.speed;
//         player.frameY = 2;
//     } else if ((keys['ArrowLeft'] || keys['Left']) && player.x > 0) {
//         player.x -= player.speed;
//         player.frameY = 1;
//     } else if ((keys['ArrowUp'] || keys['Up']) && player.y > 0){
//         player.y -= player.speed;
//         player.frameY = 3;
//     } else if ((keys['ArrowDown'] || keys['Down']) && player.y < (canvas.height - player.height)){ 
//         player.y += player.speed;
//         player.frameY = 0;
//     }
// }

//Move Player function that uses speed to move in grid spaces
let fired = false;
function movePlayer() {
    if ((keys['ArrowRight'] || keys['Right']) && player.x < (canvas.width - 60) && !fired) {
        player.frameY = 2;
        fired = true;
        player.moving = true;
        var count = 0;
        var id = setInterval(frame, 40);
        function frame() {
          if (count === 5) {
            clearInterval(id);
            fired = false;
            player.moving = false;
          } else {
            count++;
            player.x += player.speed;
          }
        }
    } else if ((keys['ArrowLeft'] || keys['Left']) && player.x > 30 && !fired) {
        player.frameY = 1;
        fired = true;
        player.moving = true;
        var count = 0;
        var id = setInterval(frame, 40);
        function frame() {
          if (count === 5) {
            clearInterval(id);
            fired = false;
            player.moving = false;
          } else {
            count++;
            player.x -= player.speed;
          }
        }
    } else if ((keys['ArrowUp'] || keys['Up']) && player.y > 30 && !fired){
        player.frameY = 3;
        fired = true;
        player.moving = true;
        var count = 0;
        var id = setInterval(frame, 40);
        function frame() {
          if (count === 5) {
            clearInterval(id);
            fired = false;
            player.moving = false;
          } else {
            count++;
            player.y -= player.speed;
          }
        }
    } else if ((keys['ArrowDown'] || keys['Down']) && player.y < (canvas.height - 60) && !fired){ 
        player.frameY = 0;
        fired = true;
        player.moving = true;
        var count = 0;
        var id = setInterval(frame, 40);
        function frame() {
          if (count === 5) {
            clearInterval(id);
            fired = false;
            player.moving = false;
          } else {
            count++;
            player.y += player.speed;
          }
        }
    }
}

function handlePlayerFrame() {
    if((player.frameX < 3) && player.moving === true) {
        player.frameX++
    } else {
        player.frameX = 0
    }
}

function drawBackground() {
    gridLength = 8;
    ctx.fillStyle = "darkgreen";
    ctx.fillRect(0, 0, tileLength, tileLength);
    for (let i= 0; i<gridLength; i++) {
        for (let j=0; j<gridLength; j++) {
            let iValue = i%2;
            let jValue = j%2;
            if(iValue === 0) {
                if ((iValue === 0)&&(jValue === 0)) {
                    ctx.fillRect(i * tileLength, j* tileLength, tileLength, tileLength);
                }  
            } else {
                if ((iValue === 1)&&(jValue === 1)) {
                    ctx.fillRect(i * tileLength, j* tileLength, tileLength, tileLength);
                }  
            }
        }
    }
}







//Animation 
let  fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate () {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now -then; 
    if (elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval)
        ctx.clearRect(0,0,canvas.width, canvas.height);
        drawBackground();
        drawSprite(playerSprite, player.frameX*player.width, player.frameY*player.height, player.width, player.height, player.x, player.y, player.width, player.height)
        movePlayer();
        handlePlayerFrame();
        requestAnimationFrame(animate);
    }
}

startAnimating(fps);

// function animate() {
    // ctx.clearRect(0,0,canvas.width, canvas.height);
    // drawSprite(playerSprite, player.frameX*player.width, player.frameY*player.height, player.width, player.height, player.x, player.y, player.width, player.height)
    // movePlayer();
    // handlePlayerFrame();
    // requestAnimationFrame(animate);
// }
// animate();