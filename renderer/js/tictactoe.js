
var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

var back= document.getElementById("back");
if (back){
    back.addEventListener("click", function(){
        window.location.href="../pages/game.html";
    });
}else{
    console.log("Unable to go back");
}

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]

    document.getElementById("status").innerText= "player O's turn";

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();  //it will convert to 1-2
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') { 
        //already taken spot
        return;
    }
    
    board[r][c] = currPlayer; //mark the board
    this.innerText = currPlayer; //mark the board on html

    //check winner
    checkWinner();

    if (gameOver) return;

    //switching players
    currPlayer= (currPlayer == playerO)? playerX: playerO;

    //update turn status
    document.getElementById("status").innerText= "player" +currPlayer + "'s turn";


    
}


function checkWinner() {
    //check horizontally
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            //if we found the winning row
            //apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;

            let status=document.getElementById("status");
           status.innerText= "player" + board[r][0]+ " wins!";
           setTimeout(() => {
     status.innerHTML = '<button id="restartbutton" onclick="restartGame()">restart</button>';
}, 2000);
            
            return;
        }
    }

    //check vertically
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;

            let status = document.getElementById("status");

                     status.innerText= "player" + board[0][c]+ " wins!";
            setTimeout(() => {
     status.innerHTML = '<button id="restartbutton" onclick="restartGame()">restart</button>';
}, 2000);
return;
        }
    }

//diagonally
if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
    for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(i.toString() + "-" + i.toString());                
        tile.classList.add("winner");
    }
    gameOver = true;

    let status = document.getElementById("status");
    status.innerText= "player" + board[0][0]+ " wins!";
    setTimeout(() => {
        status.innerHTML = '<button id="restartbutton" onclick="restartGame()">restart</button>';
    }, 2000);

    return;
}

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;

        let status = document.getElementById("status");
        status.innerText= "player" + board[0][2]+ " wins!";
        setTimeout(() => {
            status.innerHTML = '<button id="restartbutton" onclick="restartGame()">restart</button>';
        }, 2000);
        return;
    }


    //tie condition
    let istie = true;
    for (let r=0; r<3; r++){
        for (let c=0; c<3; c++){
            if (board[r][c]== ' '){
                istie=false;
            }
        }
    }

    if (istie){
        gameOver=true;

        let status = document.getElementById("status");
        status.innerText="it's is tie!";
         setTimeout(() => {
            status.innerHTML = '<button id="restartbutton" onclick="restartGame()">restart</button>';
        }, 2000);
        

    }

}

function restartGame() {
    // reset variables
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    currPlayer = playerO;
    gameOver = false;

    // clear UI board
    let tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.innerText = "";
        tile.classList.remove("winner");
    });

    // reset status
    let status = document.getElementById("status");
    status.innerText = "Player O's Turn";
    status.onclick = null; // remove click
}