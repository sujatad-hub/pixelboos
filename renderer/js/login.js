document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://api-pixelboos.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username,password})
    });

    const data = await response.json();

    if (response.ok){
document.getElementById("message").innerText = "Login successful";    

console.log("Before setting:", localStorage.getItem("username"));

localStorage.setItem("username", username);

console.log("After setting:", localStorage.getItem("username"));

setTimeout(()=> {
    window.location.replace("../pages/game.html");
},1000);

 }else{
        document.getElementById("message").innerText = data.message;
    }

});