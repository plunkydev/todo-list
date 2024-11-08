import { createTask } from "./createTask";
import { getProjectsData } from "./StorageService";
import { saveTask } from "./StorageService";

export function createformTask() {
    const div = document.createElement("div");
    div.classList.add("formTaskContainer");
    div.innerHTML = `
        <form id="taskForm">
            <label for="project">Projects:</label>
            <select id="project" name="project"></select>
            <br><br>
            
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required>
            <br><br>

            <label for="description">Description:</label>
            <textarea id="description" name="description"></textarea>
            <br><br>

            <label for="dueDate">Due Date:</label>
            <input type="date" id="dueDate" name="dueDate">
            <br><br>

            <label for="priority">Priority:</label>
            <select id="priority" name="priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <br><br>

            <label>
                <input type="checkbox" id="completed" name="completed">
                Task Completed
            </label>
            <br><br>

            <button id="btnSubmitTask" type="submit">Add Task</button>
        </form>
    `;
    
    const content = document.getElementById("floatWindow");
    content.innerHTML = "";
    content.appendChild(div);

    // Llamar a getProjectsData para obtener los proyectos y poblar el select
    const proyectos = getProjectsData();
    agregarOpcionesAlSelect(proyectos);

    const btnSubmitTask = document.getElementById('btnSubmitTask');
    btnSubmitTask.addEventListener("click", function (event) {
        event.preventDefault();
        
        const task = createTask(
            document.getElementById('title').value, 
            document.getElementById('description').value, 
            document.getElementById('dueDate').value, 
            document.getElementById('priority').value, 
            document.getElementById('completed').checked, 
            document.getElementById('project').value
        );
        saveTask(task);
        
        // Aquí podrías llamar a una función para guardar en localStorage, como saveTasks(task)

        // Limpiar el formulario después de enviarlo
        document.getElementById('taskForm').reset();
        content.removeChild(div);
    });
}

// Función para agregar opciones al <select> usando el array de proyectos
function agregarOpcionesAlSelect(opciones) {
    const selectElement = document.getElementById('project');
    selectElement.innerHTML = ''; // Limpia cualquier opción previa

    opciones.forEach(opcion => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion;
        optionElement.textContent = opcion;
        selectElement.appendChild(optionElement);
    });
}
