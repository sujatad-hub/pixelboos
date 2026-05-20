let selectedchoice=null;

const choices=document.querySelectorAll(".choice");
const selectbtn= document.getElementById("select-btn");
const restartbtn = document.getElementById("restart-btn");

let playerscore=0;
let computerscore=0;
let gameover=false;

var gobackbtn=document.getElementById("goback");
if (gobackbtn){
    gobackbtn.addEventListener("click", function(){
        window.location.href="../pages/game.html";
    });
}else{
    console.log("Unable to go back");
}

document.addEventListener("DOMContentLoaded", () => {
    loaddetails();
});

async function loaddetails(){
    try{
        const username=localStorage.getItem("username");

        const res = await fetch(`https://api-pixelboos.onrender.com/getuserdata/${username}`);
        const data = await res.json();

             console.log("DATA:", data);

        document.getElementById("username").innerText=data.username;

        document.getElementById("playercharacter").src =`https://api-pixelboos.onrender.com${data.characterimage}`;
    }catch(err){
        console.log(err)
    }
}


choices.forEach(choice => {
choice.addEventListener("click", () =>{
    //remove previous selection
    choices.forEach(c => c.classList.remove("selected"));

    //adding highlight
    choice.classList.add("selected");

    //storing the choice
    selectedchoice=choice.id;
    });
});

    
selectbtn.addEventListener("click", () =>{
    if (!selectedchoice){
        alert("Please select an option first!");
        return;
    }

    play(selectedchoice);
});

function play(playerchoice){
    if (gameover) return;

    const options=["rock","paper","scissor"];
    const computerchoice=options[Math.floor(Math.random() * 3)];

    let result= "";

    if(playerchoice === computerchoice){
        document.getElementById("computer-choice").src = `../assets/${computerchoice}.png`;
        result = "it's a draw!";
    }
    else if (
        (playerchoice === "rock" && computerchoice === "scissor") ||
        (playerchoice === "paper" && computerchoice === "rock") ||
        (playerchoice === "scissor" && computerchoice === "paper")
    ){
        document.getElementById("computer-choice").src = `../assets/${computerchoice}.png`;
        playerscore++;
    } else {
        document.getElementById("computer-choice").src = `../assets/${computerchoice}.png`;
        computerscore++;
    }

    document.getElementById("result").innerText = result;
    document.getElementById("player-score").innerText = playerscore;
    document.getElementById("computer-score").innerText = computerscore;

    if (playerscore === 5){
        document.getElementById("result").innerText="you win the game!";
        gameover=true;

        selectbtn.style.display="none";
        restartbtn.style.display = "block";

    } else if (computerscore === 5){
        document.getElementById("result").innerText="Computer won the game";
        gameover=true;

        selectbtn.style.display = "none";
        restartbtn.style.display="block";
    }
}

function restartgame(){
    playerscore=0;
    computerscore=0;
    gameover=false;

    document.getElementById("player-score").innerText=0;
    document.getElementById("computer-score").innerText=0;
    document.getElementById("result").innerText="";

    selectedchoice=null;
    choices.forEach(c=> c.classList.remove("selected"));

    selectbtn.style.display = "block";

    restartbtn.style.display="none";
}
    

   