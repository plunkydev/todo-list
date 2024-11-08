import { saveProject } from "./StorageService"
import { getProjectsData } from "./StorageService";
export function createformProject() {
    const div = document.createElement("div");
    div.classList.add("formTaskContainer");
    div.innerHTML = `
        <form id="projectForm">
    <label for="project">Project:</label>
    <input type="text" id="project" name="project" required>
    <br><br>

    <button id="btnSubmitProject" type="submit">Add Project</button>
</form>
    `;
    
    const content = document.getElementById("floatWindow");
    content.innerHTML = "";
    content.appendChild(div);
    const btnSubmitTask = document.getElementById('btnSubmitProject');
    btnSubmitTask.addEventListener("click", function (event) {
        event.preventDefault();
        
        const project = document.getElementById('project').value;
        saveProject(document.getElementById('project').value)

        console.log(project);
        // Aquí podrías llamar a una función para guardar en localStorage, como saveTasks(task)

        // Limpiar el formulario después de enviarlo
        document.getElementById('projectForm').reset();
        content.removeChild(div);
    }
    );
};

export function showProjecs() {
    const data = getProjectsData();
    const list = document.getElementById('showProjects');
    list.innerHTML = '';
    for (const project of data) {
        const elementList = document.createElement('li');
        elementList.classList.add('projectsList');
        elementList.innerText = project;
        list.appendChild(elementList)
    }
}

//showProjecs()