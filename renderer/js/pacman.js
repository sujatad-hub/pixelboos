var gobackbtn=document.getElementById("goback");
if (gobackbtn){
    gobackbtn.addEventListener("click", function(){
        window.location.href="../pages/game.html";
    });
}else{
    console.log("Unable to go back");
}

var restartbtn= document.getElementById("restart-btn");

//board
let board;

const rowcount = 19;
const columncount= 19;
const tilesize =32;
const boardwidth=columncount*tilesize;
const boardheight = rowcount*tilesize;
let context;

let nextdirection=null;

//images
let blueghostimage;
let orangeghostimage;
let pinkghostimage;
let redghostimage;
let pacmanupimage;
let pacmandownimage;
let pacmanleftimage;
let pacmanrightimage;
let wallimage;

const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "XXXXXXXXXXXXXXXXXXX"
];

const walls= new Set();
const foods = new Set();
const ghosts= new Set();
let pacman;

const directions = ['U','D','L','R'];
let score = 0; 
let lives=3;
let gameOver = false;
let gamewin= true;

window.onload= function(){
    board=document.getElementById("board");
    board.height= boardheight;
    board.width= boardwidth;
    context = board.getContext ("2d");

    loadimages();
    loadMap();
    //console.log(walls.size);
    //console.log(foods.size);
    //console.log(ghosts.size);

    for (let ghost of ghosts.values()){
        const newDirection = directions[Math.floor(Math.random()*4)];
        ghost.updateDirection(newDirection);
    }
    update();

    document.addEventListener("keyup", movePacman);
}


//restart btn function
if (restartbtn){
    restartbtn.addEventListener("click", function(){
        loadMap();
        resetPositions();
        lives=3;
        score=0;
        gameOver=false;

        restartbtn.style.display="none";
        update();
    });
}


function loadimages(){
    wallimage= new Image();
    wallimage.src = "../assets/wall.png";

    blueghostimage= new Image();
    blueghostimage.src="../assets/blueGhost.png";

    orangeghostimage= new Image();
    orangeghostimage.src="../assets/orangeGhost.png";

    pinkghostimage= new Image();
    pinkghostimage.src="../assets/pinkGhost.png";

    redghostimage=new Image();
    redghostimage.src="../assets/redGhost.png";

    pacmanupimage=new Image();
    pacmanupimage.src="../assets/pacmanUp.png";

    pacmandownimage=new Image();
    pacmandownimage.src="../assets/pacmanDown.png";

    pacmanleftimage=new Image();
    pacmanleftimage.src="../assets/pacmanLeft.png";

    pacmanrightimage=new Image();
    pacmanrightimage.src="../assets/pacmanRight.png";


}

function loadMap(){
    walls.clear();
    foods.clear();
    ghosts.clear();

    for (let r=0;r<rowcount;r++){
        for (let c=0;c<columncount;c++){
            const row = tileMap[r];
            const tileMapChar= row[c];

            const x=c*tilesize;
            const y=r*tilesize;

            if(tileMapChar =='X'){  //for block wall
                const wall= new Block(wallimage,x,y,tilesize, tilesize);
                walls.add(wall)
            }
            else if (tileMapChar=='b'){ //for blue ghost
                const ghost = new Block(blueghostimage,x,y,tilesize, tilesize);
                ghosts.add(ghost);
            }
            else if (tileMapChar=='o'){//orange ghost
                const ghost = new Block(orangeghostimage,x,y,tilesize, tilesize);
                ghosts.add(ghost);
            }
             else if (tileMapChar=='p'){//pink ghost
                const ghost = new Block(pinkghostimage,x,y,tilesize, tilesize);
                ghosts.add(ghost);
            }
             else if (tileMapChar=='r'){//red ghost
                const ghost = new Block(redghostimage,x,y,tilesize, tilesize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'P'){ //pacman
                pacman = new Block(pacmanrightimage,x,y,tilesize, tilesize);
            }
            else if (tileMapChar==' '){//empty is food
                const food = new Block(null, x+14, y+14, 4, 4);
                foods.add(food);
            }
        }
    }
}

function update(){
    if (gameOver){
        return;
    }
    move();
    draw();
    setTimeout(update,90);
}

function draw(){
    context.clearRect(0,0,board.width, board.height);
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    for(let ghost of ghosts.values()){
        context.drawImage(ghost.image, ghost.x,ghost.y, ghost.width, ghost.height);
    }
    for (let wall of walls.values()){
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }
    context.fillStyle = "white";
    for(let food of foods.values()){
        context.fillRect(food.x, food.y, food.width, food.height);
    }

    context.fillStyle="white";
    context.font ="14px sans-serif";
    if (gameOver){
        context.fillText("Game Over: " + String(score), tilesize/2, tilesize/2);
    }
    else{
        context.fillText ("x" +String(lives) + " " + String(score), tilesize/2, tilesize/2);
    }

}

function move(){
    
    if(nextdirection){
        pacman.updateDirection(nextdirection);
    }


    pacman.x +=pacman.velocityX;
    pacman.y+=pacman.velocityY;

    //check wall collisions
    for (let wall of walls.values()){
        if (collision(pacman, wall)){
            pacman.x -= pacman.velocityX;
            pacman.y -=pacman.velocityY;
            break;
        }
    }

    for(let ghost of ghosts.values()){
        if (collision(ghost, pacman)){
            lives -=1;
            if (lives == 0){
                gameOver=true;
                restartbtn.style.display="block";
                return;
            }
            resetPositions();
        }
    }

    for (let ghost of ghosts.values()){

        if (ghost.y == tilesize*9 && ghost.direction != 'U' && ghost.direction != 'D'){
            ghost.updateDirection('U');
        }

        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;
        for (let wall of walls.values()){
            if (collision(ghost, wall) || ghost.x <=0 || ghost.x + ghost.width >=boardwidth){
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;
                const newDirection=directions[Math.floor(Math.random()*4)];
                ghost.updateDirection(newDirection);
            }
        }
    }

    // teleport through tunnels
    if (pacman.x < 0){
        pacman.x = boardwidth - pacman.width;
    }
    else if (pacman.x + pacman.width > boardwidth){
        pacman.x = 0;
    }

    //check for food collisions
    let foodEaten = null;
    for (let food of foods.values()){
        if (collision (pacman, food)){
            foodEaten = food;
            score +=10;
            break;
        }
    }
    foods.delete(foodEaten);

    if (foods.size ==0){
        gamewin=true;
        gameOver=true;

        document.getElementById("wintext").style.display = "block";
        restartbtn.style.display = "block";
        return;
    }
}

function movePacman(e){
    if (e.code == "ArrowUp" || e.code == "KeyW"){
        nextdirection='U';
    }
    else if (e.code == "ArrowDown" || e.code == "KeyS"){
        nextdirection='D';
    }
    else if(e.code == "ArrowLeft" || e.code == "KeyA"){
        nextdirection='L';
    }
    else if(e.code == "ArrowRight" || e.code == "KeyD"){
        nextdirection='R';
    }

    
}

function collision(a,b){
    return a.x < b.x + b.width && 
            a.x + a.width > b.x &&
            a.y < b.y+b.height && 
            a.y + a.height > b.y;
}
function resetPositions(){
    pacman.reset();
    pacman.velocityX=0;
    pacman.velocityY=0;
    for (let ghost of ghosts.values()){
        ghost.reset();
        const newDirection=directions[Math.floor(Math.random()*4)];
        ghost.updateDirection(newDirection);
    }
}

class Block {
    constructor(image, x, y, width, height){
        this.image = image;
        this.x=x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.startX=x;
        this.startY=y;

        this.direction='R';
        this.velocityX=0;
        this.velocityY=0;
    }
    updateDirection(direction){
        const prevDirection = this.direction;
        this.direction=direction;
        this.updateVelocity();
        this.x += this.velocityX;
        this.y += this.velocityY;

        for (let wall of walls.values()){
            if (collision(this, wall)){
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = prevDirection;
                this.updateVelocity();
                return;
            }
        }


        if (this==pacman){
            if(this.direction == 'U') this.image = pacmanupimage;
            else if (this.direction == 'D') this.image = pacmandownimage;
            else if (this.direction == 'L') this.image = pacmanleftimage;
            else if (this.direction == 'R') this.image = pacmanrightimage;
        }

        
    }
    updateVelocity(){
        if(this.direction == 'U'){
            this.velocityX=0;
            this.velocityY= -tilesize/4;
        }
        else if(this.direction == 'D'){
            this.velocityX=0;
            this.velocityY= tilesize/4;
        }
        else if(this.direction == 'L'){
            this.velocityX=-tilesize/4;
            this.velocityY= 0;
        }
        else if (this.direction == 'R'){
            this.velocityX=tilesize/4;
            this.velocityY=0;
        }
    }
    reset(){
        this.x = this.startX;
        this.y=this.startY;
    }
}
