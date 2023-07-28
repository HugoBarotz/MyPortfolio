let box = document.querySelector('#home')
let height = box.offsetHeight

window.onscroll = function() {
  // We add pageYOffset for compatibility with IE.
  if (window.scrollY >= 1.5*height || window.pageYOffset >= 1.5*height) {
  /* sky */
    document.getElementsByTagName("header")[0].style.backgroundColor = "#1B2735"
    document.getElementsByTagName("header")[0].style.color = "#f0f8ff"

    const menulinks = document.querySelectorAll('.menulink')
	menulinks.forEach(menulink => {
    menulink.style.color = "#f0f8ff"
	})
  } else {
  /* petrol blue */
    document.getElementsByTagName("header")[0].style.backgroundColor = "#1d4851"
    document.getElementsByTagName("header")[0].style.color = "#f0fff0"

    const menulinks = document.querySelectorAll('.menulink')
	menulinks.forEach(menulink => {
    menulink.style.color = "#f0fff0"
	})
  }
}


const wordInput = document.getElementById('search-input')
const encapsulatedWords = document.getElementById('encapsulated-words')
const encapsulatedWordsArray = []

wordInput.addEventListener('keyup', function(event) {
    if ((event.key === ' ') || (event.key === 'Enter')) {
        const word = wordInput.value.trim()
        encapsulatedWordsArray.push(word)
        if (word !== '') {
            const encapsulatedWord = document.createElement('span')
            encapsulatedWord.classList.add('encapsulated-word')
            encapsulatedWord.innerHTML = `${word}<span class="remove-word">X</span>`
            encapsulatedWords.appendChild(encapsulatedWord)

            encapsulatedWord.querySelector('.remove-word').addEventListener('click', function() {
                encapsulatedWords.removeChild(encapsulatedWord)
                encapsulatedWordsArray.splice(encapsulatedWordsArray.indexOf(word), 1)
                searchFilteredProjects()
            })

            wordInput.value = ''
        }
        searchFilteredProjects()
    }
})

/* search projects */
function searchProjects() {
	console.log("Searching for corresponding projects...")
    const jsonConstraints = JSON.stringify(encapsulatedWordsArray)
    return fetch("https://project-fb.onrender.com/api/v1/project/_search", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonConstraints
        })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                alert("Bad request")
            }
        })
        .catch(error => {
            console.error("Error occurred while fetching projects:", error)
        })
}

function createAllProjectDivs() {
    searchProjects()
        .then(data => {
            for (const project of data.projects) {
                addProjectDiv(project.id, project.name, project.skills, project.description, project.githubLink)
            }
        })

}

async function searchFilteredProjects() {
    try {
        const data = await searchProjects()
        const ids = data.projects ? data.projects.map(project => project.id) : []

        const projectsDiv = document.getElementById('all-projects')
        for (const child of projectsDiv.children) {
            const projectId = child.getAttribute("projectId")
            child.style.display = ids.includes(projectId) ? "block" : "none"
        }
    } catch (error) {
        console.error("Error occurred while fetching projects:", error)
    }
}

function addProjectDiv(id, name, skills, description, githubLink) {
    const currentDiv = document.getElementById("all-projects")
    const newProject = document.createElement("div")
    newProject.setAttribute("projectId", id)
    newProject.classList.add("project")
    const newImage = document.createElement("img")
    newImage.classList.add("project-image")
    newImage.src = "./assets/images/wow-dragon.jpg"

    const newBanner = document.createElement("div")
    newBanner.classList.add("banner")

    const createSpanWithClassAndText = (className, text) => {
        const newSpan = document.createElement("span")
        newSpan.classList.add(className)
        newSpan.textContent = text
        return newSpan
    }

    const newSpanName = createSpanWithClassAndText("name", name)
    const newSpanSkills = createSpanWithClassAndText("skills", "Stack: " + skills.join(", "))

    const newSpanGithub = createSpanWithClassAndText("github")
    const newGithubLink = document.createElement("a")
    newGithubLink.href = githubLink
    newGithubLink.target= "_blank"
    newGithubLink.textContent = "Github"
    newSpanGithub.appendChild(newGithubLink)

    const newSpanDescription = createSpanWithClassAndText("description", description)

    newBanner.appendChild(newSpanName)
    newBanner.appendChild(newSpanSkills)
    newBanner.appendChild(newSpanGithub)
    newBanner.appendChild(newSpanDescription)

    newProject.appendChild(newImage)
    newProject.appendChild(newBanner)

    currentDiv.prepend(newProject)
}