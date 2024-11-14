import { createTask } from "./createTask";
import { getProjectsData, getAllTasksData, deleteTaskById } from "./StorageService";
import { saveTask } from "./StorageService";

export function createformTask() {
    const floatWindow = document.getElementById("floatWindow");
    floatWindow.style.display = 'block';
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
            <textarea id="description" name="description" maxlength="85"></textarea>
            <p id="charCount">85 caracteres restantes</p>
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

    // Funcionalidad para el contador de caracteres
    const textarea = document.getElementById('description');
    const charCount = document.getElementById('charCount');
    textarea.addEventListener('input', function () {
        const maxLength = textarea.getAttribute('maxlength');
        const currentLength = textarea.value.length;
        charCount.textContent = `${maxLength - currentLength} caracteres restantes`;
    });

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
        showTasks();
        document.getElementById('taskForm').reset();
        content.removeChild(div);
        floatWindow.style.display = 'none';
    });
}

// Function to add options to the <select> using the projects array
function agregarOpcionesAlSelect(opciones) {
    const selectElement = document.getElementById('project');
    selectElement.innerHTML = '';

    opciones.forEach(opcion => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion;
        optionElement.textContent = opcion;
        selectElement.appendChild(optionElement);
    });
}


export function showTasks(prop = null) {
    const tasks = getAllTasksData();

    // Filter tasks if a specific project is passed as an argument
    const filteredTasks = prop ? tasks.filter(task => task._project === prop) : tasks;

    const content = document.getElementById("content");
    content.innerHTML = "";

    // Show filtered or all tasks if prop is null
    for (let i = 0; i < filteredTasks.length; i++) {
        const div = document.createElement("div");
        div.classList.add("taskContiner");
        div.id = `task${i + 1}`;
        div.innerHTML = `
            <p id="taskDate"><strong>Do before: </strong>${filteredTasks[i]._dueDate}</p>
            <h2 id="taskTitle">${filteredTasks[i]._title}</h2>
            <p id="taskDescription">${filteredTasks[i]._description}</p>
            <p id="taskProject"><strong>Project:</strong> ${filteredTasks[i]._project}</p>
            <p id="taskPriority"><strong>Priority: </strong>${filteredTasks[i]._priority}</p>
            <div class="taskBtnContiner">
                <button type="button" id="btnTaskEdit-${i}" class="taskBtn">Edit</button>
                <button type="button" id="btnTaskRemove-${i}" class="taskBtn">Remove</button>
                <button type="button" id="btnTaskCheckList-${i}" class="taskBtn">Done</button>
            </div>
        `;
        
        // Agregar el contenedor al contenido principal
        content.appendChild(div);

        // Agregar event listeners a los botones
        const editBtn = document.getElementById(`btnTaskEdit-${i}`);
        const removeBtn = document.getElementById(`btnTaskRemove-${i}`);
        const doneBtn = document.getElementById(`btnTaskCheckList-${i}`);

        // Listener para el botón Editar
        editBtn.addEventListener("click", () => {
            console.log(`Editando tarea: ${filteredTasks[i]._title}`);
            showTasks();
        });

        // Listener para el botón Eliminar
        removeBtn.addEventListener("click", () => {
            deleteTaskById(filteredTasks[i]._idData);
            showTasks(prop); // Actualizar solo las tareas del proyecto actual
        });
        
        // Listener para el botón Marcar como Hecho
        doneBtn.addEventListener("click", () => {
            console.log(`Tarea completada: ${filteredTasks[i]._title}`);
            showTasks(prop); // Actualizar solo las tareas del proyecto actual
        });
    }
}

