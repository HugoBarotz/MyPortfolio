let box = document.querySelector('#home')
let height = box.offsetHeight

window.onscroll = function() {
  // We add pageYOffset for compatibility with IE.
  if (window.scrollY >= 1.5*height || window.pageYOffset >= 1.5*height) {
  /* sky */
    document.getElementsByTagName("header")[0].style.backgroundColor = "#1B2735"
    document.getElementsByTagName("header")[0].style.color = "#f0f8ff"

    const updateColors = document.querySelectorAll('.update-color')
		updateColors.forEach(updateColor => {
        updateColor.style.color = "#f0f8ff"
	})
  } else {
  /* petrol blue */
    document.getElementsByTagName("header")[0].style.backgroundColor = "#1d4851"
    document.getElementsByTagName("header")[0].style.color = "#f0fff0"

    const updateColors = document.querySelectorAll('.update-color')
		updateColors.forEach(updateColor => {
        updateColor.style.color = "#f0fff0"
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
    /*return fetch("https://project-fb.onrender.com/api/v1/project/_search", {*/
    return fetch("http://localhost:8080/api/v1/project/_search", {
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
                addProjectDiv(project.id, project.name, project.skills, project.description, project.githubLink, project.applicationType)
            }
        })

}

async function searchFilteredProjects() {
    try {
        const data = await searchProjects()
        const ids = data.projects ? data.projects.map(project => project.id) : []

        const projectsDiv = document.getElementById('all-projects')
        for (const child of projectsDiv.children) {
            const projectId = child.getAttribute("id")
            child.style.display = ids.includes(projectId) ? "flex" : "none"
        }
    } catch (error) {
        console.error("Error occurred while fetching projects:", error)
    }
}

const logos = {
	"html": "./assets/logos/html.png",
	"css": "./assets/logos/css.png",
	"js": "./assets/logos/js.png",
	"javascript": "./assets/logos/js.png",
	"java": "./assets/logos/java.png",
	"spring boot": "./assets/logos/springboot.png",
	"springboot": "./assets/logos/springboot.png",
	"firebase": "./assets/logos/firebase.png",
	"docker": "./assets/logos/docker.png",
	"elasticsearch": "./assets/logos/elasticsearch.png",
	"postman": "./assets/logos/postman.png",
	"soapui": "./assets/logos/soapui.png",
	"scrum": "./assets/logos/scrum.png",
	"kanban": "",
	"gitlab": "./assets/logos/gitlab.png",
	"git": "./assets/logos/git.png",
	"gherkin": "",
	"cucumber": "./assets/logos/cucumber.png",
	"python": "./assets/logos/python.png",
	"sonarqube": "./assets/logos/sonarqube.png",
	"jenkins": "./assets/logos/jenkins.png",
	"xray": "./assets/logos/xray.png",
	"junit": "./assets/logos/junit.png",
	"altair": "",
	"graphql": "./assets/logos/graphql.png",
	"rest apis": "",
	"jee": "",
}

function addProjectDiv(id, name, skills, description, githubLink, applicationType) {
    const currentDiv = document.getElementById("all-projects")
    const newProject = document.createElement("div")
    newProject.setAttribute("id", id)
    newProject.classList.add("project")
    const logosDiv = document.createElement("div")
    newProject.classList.add("logos")

    createLogoForSkills(skills, logosDiv)

    const newBanner = document.createElement("div")
    newBanner.classList.add("banner")

    const createSpanWithClassAndText = (className, text) => {
        const newSpan = document.createElement("span")
        newSpan.classList.add(className)
        newSpan.classList.add("white-sky-color")
        newSpan.textContent = text
        return newSpan
    }

    const newSpanName = createSpanWithClassAndText("name", name + " - " + ((applicationType != null) ? applicationType : ""))
    const newSpanSkills = createSpanWithClassAndText("skills", "Stack: " + skills.join(", "))
    const newSpanDescription = createSpanWithClassAndText("description", description)

    const githubDiv = document.createElement("a")
    githubDiv.classList.add("githubLink")
    githubDiv.href = githubLink
    const githubA = document.createElement("div")
    githubA.textContent = "GITHUB"
    githubDiv.appendChild(githubA)

    newBanner.appendChild(newSpanName)
    newBanner.appendChild(newSpanSkills)
    newBanner.appendChild(newSpanDescription)
    newBanner.appendChild(githubDiv)

    newProject.appendChild(logosDiv)
    newProject.appendChild(newBanner)
    newProject.style.backgroundColor = "#f0f8ff"

    currentDiv.prepend(newProject)
}

// get all projects and create divs for each
createAllProjectDivs()


// for each project, create 2 divs with a maximum of 3 logos
function createLogoForSkills(skills, newProject){
let skillImagesTotal = 0

            const newLogosDiv1 = document.createElement("div")
            newLogosDiv1.classList.add("logosDiv")
            newLogosDiv1.setAttribute("id", "logosDiv1")

            const newLogosDiv2 = document.createElement("div")
            newLogosDiv2.classList.add("logosDiv")
            newLogosDiv2.setAttribute("id", "logosDiv2")

skills.forEach((skill) => {
    const logoURL = logos[skill.toLowerCase()]

    if (logoURL && (skillImagesTotal < 6)) {
      const imageElement = document.createElement("img")
      imageElement.src = logoURL
      imageElement.alt = skill

        if(skillImagesTotal < 3){
            newLogosDiv1.appendChild(imageElement)
        } else {
            newLogosDiv2.appendChild(imageElement)
        }

      skillImagesTotal++
    }
  });

  newProject.append(newLogosDiv1)
  newProject.append(newLogosDiv2)
}