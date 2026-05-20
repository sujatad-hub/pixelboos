document.addEventListener('DOMContentLoaded', function() {
	var btn = document.getElementById("loginbtn");
	if (btn) {
		btn.addEventListener("click", function() {
			window.location.href = "../pages/login.html";
		});
	} else {
		console.warn('loginbtn not found in DOM');
	}
});
function exitapp(){
	window.close();
}