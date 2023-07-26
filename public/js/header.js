const loginId = document.getElementById("login-id")

loginId.addEventListener('click', (e) -> {
	if(loginId.textContent == "logout"){
        localStorage.removeItem('username')
	}
})

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem("username") != null) {
        const elementsToShow = document.getElementsByClassName("show-if-logged")
        for (const element of elementsToShow) {
            element.style.display = "block"
        }
        const elementsToHide = document.getElementsByClassName("hide-if-logged")
        for (const element of elementsToHide) {
            element.style.display = "none"
        }
    }
}, false)