canvas = document.getElementById("myCanvas")
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

//ctx.fillRect(20, 20, 150, 100);

const keys = [];

const player = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
}

const playerSprite = new Image();
playerSprite.src = "rincewind.png";
playerSprite.onload = function(){
    drawSprite(playerSprite, 0, 0, player.width, player.height, player.x, player.y, player.width, player.height)
}

function drawSprite (img, sX, sY, sW, sH, dx, dy, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dx, dy, dW, dH);
}

//ctx.drawImage(playerSprite, 0, 0, player.width, player.height)



function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawSprite(playerSprite, 0, 0, player.width, player.height, player.x, player.y, player.width, player.height)

    requestAnimationFrame(animate());
}
animate();