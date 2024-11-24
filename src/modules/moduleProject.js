import { saveProject, getProjectsData, deleteProject } from "./StorageService"
import { showTasks } from "./moduleTask";

export function createformProject() {

    const floatWindow = document.getElementById("floatWindow");
    floatWindow.style.display = 'block';

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
        saveProject(project);

        document.getElementById('projectForm').reset();
        content.removeChild(div);
        floatWindow.style.display = 'none';
    }
    );
};

    export function showProjecs() {
        const projectsData = getProjectsData();
        const list = document.getElementById('showProjects');
        list.innerHTML = '';
        for (const project of projectsData) {
            const elementList = document.createElement('li');
            elementList.classList.add('projectsList', 'clickable');
    
            elementList.innerText = project;
    
            const deleteIcon = document.createElement('span');
            deleteIcon.innerHTML = '🗑️';
            deleteIcon.classList.add('deleteIcon');
            deleteIcon.id = `delete-${project}`;

            elementList.addEventListener('click', (event) => {
                showTasks(project);
            })
    
            deleteIcon.addEventListener('click', (event) => {
                const userConfirmation = confirm(`Are you sure you want to delete the project: ${project}? This action will delete the tasks in this project`);
                if (userConfirmation) {
                    event.stopPropagation();
                    deleteProject(project);
                    showProjecs();
                    showTasks();
                } else {
                    return;
                }
            });
    
            if (project !== 'general') {
                elementList.appendChild(deleteIcon);
                
            }
    
            list.appendChild(elementList);
        }
    }