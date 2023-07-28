function closeInfoBox() {
	let infoBox = document.querySelector('.info-box');
    infoBox.style.display = 'none';
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

	if(loginForm.username.value){
		let username = loginForm.username.value
        const loginId = document.getElementById('login-id')

        sessionStorage.setItem('username', username)
        loginId.textContent = "logout"

        window.location.href = "./projects.html"
    }else{
        alert("Username must not be empty!")
    }
})
