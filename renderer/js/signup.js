document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://api-pixelboos.onrender.com/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password})
    });

    const data = await response.json();
    console.log(data);

    const message = document.getElementById("message");
    if (response.ok){
       message.innerText=data.message
    }
    else{
        message.innerText = data.message;
    }

});