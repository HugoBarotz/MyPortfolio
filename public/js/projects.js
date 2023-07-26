const encapsulatedWordsArray = [];

function searchProjects() {
    const jsonConstraints = JSON.stringify(encapsulatedWordsArray);
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
            console.error("Error occurred while fetching projects:", error);
        });
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
        const data = await searchProjects();
        const ids = data.projects ? data.projects.map(project => project.id) : []

        const projectsDiv = document.getElementById('projects');
        for (const child of projectsDiv.children) {
            if (child.id !== "add-project") {
                const projectId = child.getAttribute("projectId");
                child.style.display = ids.includes(projectId) ? "block" : "none";
            }
        }
    } catch (error) {
        console.error("Error occurred while fetching projects:", error);
    }
}

function addProjectDiv(id, name, skills, description, githubLink) {
    const currentDiv = document.getElementById("projects")
    const newProject = document.createElement("div")
    newProject.setAttribute("projectId", id)
    newProject.classList.add("project")
    const newImage = document.createElement("img")
    newImage.classList.add("project-image")
    // TODO: allow user to load an image for his project & retrieve it here
    newImage.src = "../assets/images/wow-dragon.jpg"

    const newBanner = document.createElement("div")
    newBanner.classList.add("banner")

    const createSpanWithClassAndText = (className, text) => {
        const newSpan = document.createElement("span");
        newSpan.classList.add(className);
        newSpan.textContent = text;
        return newSpan;
    };

    const newSpanName = createSpanWithClassAndText("name", name);
    const newSpanSkills = createSpanWithClassAndText("skills", "Stack: " + skills.join(", "));

    const newSpanGithub = createSpanWithClassAndText("github");
    const newGithubLink = document.createElement("a")
    newGithubLink.href = githubLink
    newGithubLink.textContent = "Github"
    newSpanGithub.appendChild(newGithubLink)

    const newSpanDescription = createSpanWithClassAndText("description", description);

    newBanner.appendChild(newSpanName)
    newBanner.appendChild(newSpanSkills)
    newBanner.appendChild(newSpanGithub)
    newBanner.appendChild(newSpanDescription)

    newProject.appendChild(newImage)
    newProject.appendChild(newBanner)

    currentDiv.prepend(newProject)
}

function addProject() {}

const wordInput = document.getElementById('searchInput');
const encapsulatedWords = document.getElementById('encapsulated-words');

wordInput.addEventListener('keyup', function(event) {
    if ((event.key === ' ') || (event.key === 'Enter')) {
        const word = wordInput.value.trim();
        encapsulatedWordsArray.push(word);
        if (word !== '') {
            const encapsulatedWord = document.createElement('span');
            encapsulatedWord.classList.add('encapsulated-word');
            encapsulatedWord.innerHTML = `${word}<span class="remove-word">X</span>`;
            encapsulatedWords.appendChild(encapsulatedWord);

            encapsulatedWord.querySelector('.remove-word').addEventListener('click', function() {
                encapsulatedWords.removeChild(encapsulatedWord);
                encapsulatedWordsArray.splice(encapsulatedWordsArray.indexOf(word), 1)
                searchFilteredProjects()
            });

            wordInput.value = '';
        }
        searchFilteredProjects()
    }
});

// get all projects and create divs for each
createAllProjectDivs();