var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var player = { x: 200 , y: canvas.height/2 , w:50, h:10, hp:10, maxhp:10};
var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;
var time = 0;

let score = 0;
var paused = false;

var relativeX;
var relativeY;
var angle = 0;

let playerText = new Image();
playerText.src = 'https://github.com/Frkisocom/Space-Invader/blob/main/space%20invader/Textures/player2.png?raw=true';
let enemyText = new Image();
enemyText.src = 'https://github.com/Frkisocom/Space-Invader/blob/main/space%20invader/Textures/enemy.png?raw=true';
let bulletText = new Image();
bulletText.src = 'https://github.com/Frkisocom/Space-Invader/blob/main/space%20invader/Textures/bullet.png?raw=true"';

function drawScore(){
    ctx.fillStyle="#FFFFFF"
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 10, 50);
    if(score==redova*stupaca)
    {
        ctx.font = "50px Trebuchet MS";
        ctx.fillText("You killed all the aliens!", canvas.width/2-260, canvas.height/2);
        ctx.fillText("Congratulations!!!", canvas.width/2-200, canvas.height/2+60);
        clearInterval(interval);
    }
}

var listProjectiles = [];
function Projectile(x, y){
    this.x = x;
    this.y = y;
    this.dir = angle;
    this.dist = 700;
    this.s = 0;
    this.v = 10;
    this.alive = true;
    this.color = player.color;
}

var listEnemyProjectiles = [];
function EnemyProjectile(i){
    this.x = listEnemy[i].x;
    this.y = listEnemy[i].y;
    const dx = player.x - listEnemy[i].x;
    const dy = player.y - listEnemy[i].y;
    this.dir = Math.atan(dy/dx);
    if (dx<0)
    {
        this.dir+=Math.PI;
    }
    this.dist = 700;
    this.s = 0;
    this.v = 5;
    this.alive = true;
}

var listEnemy = [];
function Enemy(x, y){
    this.x = x;
    this.y = y;
    this.seed = Math.floor(Math.random()*100%100);
    console.log(this.seed);
}
function drawPlayer(){
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(angle);
    ctx.drawImage(playerText, -28, -28);
    ctx.restore();
}

function drawHealth(){
    ctx.fillStyle="#999999";
    ctx.fillRect(canvas.width - 112, 8, 104, 24);
    ctx.fillStyle="#FFFF00";
    ctx.fillRect(canvas.width - 110, 10, 100, 20);
    ctx.fillStyle="#FF0000";
    if(player.hp<=0){
        alert("Game over!")
        document.location.reload();
        clearInterval(interval);
    }
    else{
    ctx.fillRect(canvas.width - 110, 10, 100 - 100 * ((player.maxhp-player.hp)/player.maxhp), 20);
    }
    
}

function drawEnemy(enemy){
    ctx.drawImage(enemyText, enemy.x - 14, enemy.y -14);
}

function drawProjectile(projectile){
    projectile.x+=Math.cos(projectile.dir)*projectile.v;
    projectile.y+=Math.sin(projectile.dir)*projectile.v;
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(projectile.dir);
    ctx.drawImage(bulletText, -8, -8);
    ctx.restore();
}

function enemyCollision(enemy, j){
    for(var i = 0; i < listProjectiles.length; i++)
    {
        const udaljenost = Math.sqrt(Math.pow(listProjectiles[i].x - enemy.x, 2) + Math.pow(listProjectiles[i].y - enemy.y, 2));
        if (udaljenost<15)
        {
            score++;
            listProjectiles.splice(i, 1);
            listEnemy.splice(j, 1);
        }
    }
}

function playerCollision(){
    for(var i = 0; i < listEnemyProjectiles.length; i++)
    {
        var projX = listEnemyProjectiles[i].x + Math.cos(listEnemyProjectiles[i].dir)*listEnemyProjectiles[i].s;
        var projY = listEnemyProjectiles[i].y + Math.sin(listEnemyProjectiles[i].dir)*listEnemyProjectiles[i].s;
        const udaljenost = Math.sqrt(Math.pow(projX - player.x, 2) + Math.pow(projY - player.y, 2));
        if (udaljenost<30)
        {
            player.hp--;
            listEnemyProjectiles.splice(i, 1);
        }
    }
}

function movement(){
    if(leftPressed && rightPressed){}
    else if (leftPressed)
    {
        if(player.x <=5){}
        else{
            player.x -= 5;
            relativeX += 5;
        }
    }
    else if (rightPressed)
    {
        if(player.x >=canvas.width - 5){}
        else{
            player.x += 5;
            relativeX -= 5;
        }
    }
    if(upPressed && downPressed){}
    else if (upPressed)
    {
        if(player.y <=5){}
        else{
            player.y -= 5;
            relativeY += 5;
        }
    }
    else if (downPressed)
    {   
        if(player.y >=canvas.height - 5){}
        else{
            player.y += 5;
            relativeY -= 5;
        }
    }
}



function mouseDownHandler(){
    listProjectiles.push(new Projectile(player.x, player.y));
}

var uh = {clientX:0 , clientY: 0};
function mouseMoveHandler(e){
    uh.clientX=e.clientX;
    uh.clientY=e.clientY;
    
}

function keyDownHandler(e){
    if(e.key==="w"||e.key==="W")
    {
        upPressed = true;
    }
    if(e.key==="s"||e.key==="S")
    {
        downPressed = true;
    }
    if(e.key==="d"||e.key==="D")
    {
        rightPressed = true;
    }
    if(e.key==="a"||e.key==="A")
    {
        leftPressed = true;
    }
    if(e.key==="p"||e.key==="P")
    {
        if (paused===false)
        {
            paused = true;
        }
        else{
            paused =false;
        }
    }
}

function keyUpHandler(e){
    if(e.key==="w"||e.key==="W")
    {
        upPressed = false;
    }
    if(e.key==="s"||e.key==="S")
    {
        downPressed = false;
    }
    if(e.key==="d"||e.key==="D")
    {
        rightPressed = false;
    }
    if(e.key==="a"||e.key==="A")
    {
        leftPressed = false;
    }
}

var flip=1;
function enemyAI(){
    for(var i = 0; i < listEnemy.length; i++)
    {
        if(time%300==listEnemy[i].seed+200){
            listEnemyProjectiles.push(new EnemyProjectile(i));
        }
    }
    if(time%100==0)
    {
        switch(time/100%2){
            case 0:
                for(var i = 0; i < listEnemy.length; i++){
                    listEnemy[i].x+=10*flip;}
                    flip=flip*(-1);
                    break;
            case 1:
                for(var i = 0; i < listEnemy.length; i++){
                    listEnemy[i].y+=10;
                    }break;
        }
    }
}
var counter = 0;
function update(){
    if (paused){
        ctx.fillStyle="#000000";
        ctx.fillText("Paused.", canvas.width/2- 54, canvas.height/2+10);
    }
    else{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    relativeX = uh.clientX - canvas.offsetLeft - player.x;
    relativeY = uh.clientY - canvas.offsetTop - player.y;
    angle = Math.atan(relativeY/relativeX);
    if(relativeX<0){
        angle=angle+Math.PI;
    }
    movement();
    for(var i = 0; i < listProjectiles.length; i++){
        drawProjectile(listProjectiles[i]);
        if (listProjectiles[i].x>canvas.width||listProjectiles[i].x<0){
            listProjectiles.splice(i, 1);
        }
    }
    for(var i = 0; i < listEnemy.length; i++){
        drawEnemy(listEnemy[i]);
        enemyCollision(listEnemy[i], i);
    }
    for(var i = 0; i < listEnemyProjectiles.length; i++){
        drawProjectile(listEnemyProjectiles[i]);
        if (listEnemyProjectiles[i].y>canvas.height||listEnemyProjectiles[i].y<0){
            listEnemyProjectiles.splice(i, 1);
        }
    }
    playerCollision();
    drawPlayer();
    drawScore();
    drawHealth();
    time++;
    enemyAI();
}}

const redova = 5;
const stupaca = 15;
const razmakx = 40;
const razmaky = 30;
const offsetx = 60;
const offsety = 50;

for(var i = 0; i < redova; i++){
    for(var j = 0; j < stupaca; j++){
        var x = offsetx+(j*razmakx);
        var y = offsety+(i*razmaky);
        listEnemy.push(new Enemy(x, y));
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);

const interval = setInterval(update, 10);
