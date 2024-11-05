import { saveProject } from "./StorageService"
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
    
    const content = document.getElementById("content");
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