let blocksize=25; //size of one grid in pixels
let totalrow=17;
let totalcolumn=17;
let board;
let context;

let snakeX= blocksize * 8;  //these are the coordinates of the snake head
let snakeY=blocksize * 8; 

let speedX=0;
let speedY=0;

let snakebody=[];

let foodX;
let foodY;

let gamespeed = 150;
let gameloop; 

let score=0;

let gamestarted=false;
let gameOver=false;

var goback= document.getElementById("goback");
if(goback){
    goback.addEventListener("click", function(){
        window.location.href="../pages/game.html";
    });
}else {
    console.log("Unable to go back");
}

window.onload = function(){
    
    //setting the board height and width
    board=this.document.getElementById("board");
    board.height = totalrow* blocksize;
    board.width= totalcolumn*blocksize;
    context= board.getContext("2d");

    placefood();

    document.addEventListener("keyup", changedirection); //for movements

    gameloop = setInterval(update, gamespeed);

    document.getElementById("restartbtn").addEventListener("click", restartgame);
} 


function update(){

    if (gameOver){
        return;
    }

    //bg of a game
    context.fillStyle="#31744588";
    context.fillRect(0,0,board.width, board.height);

    //set food color and position
    context.fillStyle = "#ffee35e4";
    context.fillRect(foodX, foodY, blocksize,blocksize);

    if (gamestarted && snakeX == foodX && snakeY==foodY){
        snakebody.push([foodX, foodY]);
        placefood();

        score+=10;

        document.getElementById("score").innerText = +score;

        if (gamespeed>50){
            gamespeed -=5;
        }

        clearInterval(gameloop);
        gameloop = setInterval(update, gamespeed);
    } 

    if (gamestarted){
        
        //body of the snake to move
        for (let i=snakebody.length-1; i>0;i--){
            snakebody[i]=snakebody[i-1];  //it will store the previous part of snake to the current part
        }
        if (snakebody.length){
            snakebody[0]=[snakeX,snakeY];   //assigning the head coordinates
        }
        snakeX+= speedX * blocksize;
        snakeY+= speedY * blocksize;
    }

    


    context.fillStyle="white";
    //updating snake position in x and y coordinates
    
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for (let i=0; i<snakebody.length;i++){
        context.fillRect(snakebody[i][0],snakebody[i][1],blocksize, blocksize);     //here [i][0]=[200][175][175]=175  //create a 2d array
    }

    if (snakeX<0 || snakeX >= totalcolumn*blocksize ||snakeY<0 || snakeY >= totalrow * blocksize){
        gameOver= true;
        document.getElementById("gmessage").innerText="game over!";
        document.getElementById("restartbtn").style.display="block";
    }

    for (let i=0; i<snakebody.length; i++){
        if (snakeX == snakebody[i][0] && snakeY ==snakebody[i][1]){

            //snake eats its own body
            gameOver=true;
            clearInterval(gameloop);
            document.getElementById("gmessage").innerText="game over!";
            document.getElementById("restartbtn").style.display="block";
        }
    }
}

function changedirection(e){

    if (e.code === "Space" && !gamestarted){
        gamestarted= true;
        e.preventDefault();

        document.getElementById("message").style.display="none";

        let directions =[
            [1,0],
            [-1,0],
            [0,1],
            [0,-1]
        ];

        let randomdir = directions[Math.floor(Math.random () *4)];
        speedX=randomdir[0];
        speedY=randomdir[1];
    }

    if(!gamestarted) return;

    if((e.code == "ArrowUp" || e.code == "KeyW") && speedY !=1) {
        speedX=0;
        speedY=-1;
    }
    else if ((e.code=="ArrowDown" || e.code == "KeyS") && speedY!=-1){
        speedX=0;
        speedY=1;
    }else if ((e.code == "ArrowLeft" || e.code =="KeyA") && speedX!=1){
        speedX=-1;
        speedY=0;
    }else if ((e.code == "ArrowRight" || e.code == "KeyD" )&& speedX!=-1){
        speedX=1;
        speedY=0;
    }
}

function placefood(){
    foodX= Math.floor(Math.random()*totalcolumn)*blocksize;
    foodY=Math.floor(Math.random()* totalrow)*blocksize;
}

function restartgame(){
    snakeX= blocksize * 8;
    snakeY= blocksize * 8;

    speedX=0;
    speedY=0;

    snakebody=[];

    score=0;
    document.getElementById("score").innerText = "0";

    gamestarted= false;
    gameOver= false;

    gamespeed=150;

    placefood();

    document.getElementById("message").style.display = "block";
    document.getElementById("restartbtn").style.display="none";
    document.getElementById("gmessage").innerText= "";

    clearInterval(gameloop);
    gameloop= setInterval(update, gamespeed);
}