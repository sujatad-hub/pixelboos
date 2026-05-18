let currentUser;
window.onload = () =>{
    currentUser=localStorage.getItem("username");
    console.log("User:",currentUser);
};

    

const slider = document.getElementById("slider");
const characters = document.querySelectorAll(".character");

const characterNames=["jiji", "pecko", "snoopy", "todd"];

let index = 0;
const total = characters.length;
const width = 403;

document.getElementById("right").onclick = () => {
    index = (index + 1) % total;
    slide();
};

document.getElementById("left").onclick = () => {
    index = (index - 1 + total) % total;
    slide();
};

function slide(){
    slider.style.transform = `translateX(-${index * width}px)`;
}

document.getElementById("select").onclick= async () =>{
    const message = document.getElementById("message");
    const selectedcharacter = characterNames[index];
    if (selectedcharacter) {
        message.textContent = `${selectedcharacter} is selected!`;
    } else {
        message.textContent = "Error: No character selected";
    }
console.log("Selected character:", selectedcharacter);
    console.log("Current user:", currentUser);
 

    if(!currentUser){
        console.error("no user found in localstorage");
        return;
    }

   
    
    //sending it to the backend
    const response = await fetch("https://api-pixelboos.onrender.com/character", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            username:currentUser,
            character:selectedcharacter
        })
    });
    const data = await response.json();

    console.log(data);
 
}
 var gamebtn=document.getElementById("game");
 if (gamebtn){
    gamebtn.addEventListener("click", function(){
        window.location.href="../pages/game.html";
    });
 }
 else{
    console.warn('game not found in the DOM');
 }
