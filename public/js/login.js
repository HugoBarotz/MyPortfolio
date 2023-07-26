function closeInfoBox() {
	let infoBox = document.querySelector('.info-box');
    infoBox.style.display = 'none';
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

	if(loginForm.username.value){
        localStorage.setItem('username', loginForm.username.value)
		document.getElementById("login-id").textContent=loginForm.username.value.charAt(0).toUpperCase()
        window.location.href = "./projects.html"
        console.log('test')
        const loginId = document.getElementById('login-id')

            const username = localStorage.getItem('username')

            if (username) {
                loginId.textContent = username.charAt(0).toUpperCase()
            } else{
                loginId.textContent = "login"
            }
    }else{
        alert("Username must not be empty!")
    }
})
