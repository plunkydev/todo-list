import { createTask } from "./createTask";
import { parseISO, differenceInDays } from "date-fns";
import { 
    getProjectsData, 
    getAllTasksData, 
    deleteTaskById, 
    isCompleted, 
    todayTask, 
    nextSevenDaysTasks, 
    funUnfulfilledTask, 
    getTaskById, 
    saveTask, updateTask } from "./StorageService";


    let currentListDisplayed;

export function createformTask(taskToEdit = false) {
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

    if (taskToEdit) {
        document.getElementById('title').value = taskToEdit._title;
        document.getElementById('description').value = taskToEdit._description;
        document.getElementById('dueDate').value = taskToEdit._dueDate;
        document.getElementById('priority').value = taskToEdit._priority;
        document.getElementById('completed').checked = taskToEdit._checkList;
        document.getElementById('project').value = taskToEdit._project;
    }

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

        if (taskToEdit) {
            deleteTaskById(taskToEdit._idData);
            updateTask(taskToEdit._idData, task)
            showTasks(...currentListDisplayed);
        }
        saveTask(task);
        showTasks(...currentListDisplayed);
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


export function showTasks(byProject = null, byComplete = null, todayTasks = null, nextDays = null, unfulfilledTask = null) {
    const tasks = getAllTasksData();
    let filteredTasks = tasks;
    currentListDisplayed = [byProject, byComplete, todayTasks, nextDays, unfulfilledTask];
    // Filter tasks if a specific project is passed as an argument
    if (byProject) {
        filteredTasks = tasks.filter(task => task._project === byProject);
    } else if (byComplete) {
        if (byComplete === 'complete') {
            filteredTasks = isCompleted(true);
        } else if(byComplete === 'not complete'){
            filteredTasks = isCompleted(false);
        }
    } else if(todayTasks === 'today') {
        filteredTasks = todayTask();
    } else if(nextDays === 'next7Days') {
        filteredTasks = nextSevenDaysTasks();
    } else if(unfulfilledTask === 'unfulfilledTask') {
        filteredTasks = funUnfulfilledTask();
    } else {
        filteredTasks = tasks;
    };

    const content = document.getElementById("content");
    content.innerHTML = "";

// Mostrar tareas filtradas o todas las tareas según los parámetros
for (let i = 0; i < filteredTasks.length; i++) {
    const task = filteredTasks[i]; 
    const div = document.createElement("div");
    div.classList.add("taskContiner");
    div.id = `task${i + 1}`;
    div.innerHTML = `
        <p id="taskDate-${i}"><strong>Do before: </strong>${task._dueDate}</p>
        <h2 id="taskTitle-${i}">${task._title}</h2>
        <p id="taskDescription-${i}">${task._description}</p>
        <p id="taskProject-${i}"><strong>Project:</strong> ${task._project}</p>
        <p id="taskPriority-${i}"><strong>Priority: </strong>${task._priority}</p>
        <p id="taskCompleted-${i}"><strong>Completed: </strong><span id="isCompleted-${i}"></span></p>
        <div class="taskBtnContainer">
            <button type="button" id="btnTaskEdit-${i}" class="taskBtn">Edit</button>
            <button type="button" id="btnTaskRemove-${i}" class="taskBtn">Remove</button>
            <button type="button" id="btnTaskCheckList-${i}" class="taskBtn">Done</button>
        </div>
    `;

        // Añadir el contenedor al contenido principal
        content.appendChild(div);

    // Asignar color de fondo según la prioridad

    switch (task._priority.toLowerCase()) {
        case 'high':
            div.style.backgroundColor = '#ff66667d'; // Rojo para prioridad alta
            break;
        case 'medium':
            div.style.backgroundColor = '#ffcc6680'; // Naranja para prioridad media
            break;
        case 'low':
            div.style.backgroundColor = '#99ff9980'; // Verde para prioridad baja
            break;
        default:
            div.style.backgroundColor = '#ffffff'; // Gris para prioridad desconocida
            break;
    }

            // Cambiar el color de fondo según la cercanía de la fecha límite usando date-fns
            const dueDate = parseISO(task._dueDate);
            const currentDate = new Date();
            const timeDiff = differenceInDays(dueDate, currentDate); // Diferencia en días
    
    // Verificar si la tarea está completada y actualizar la información de la interfaz
    const completedElement = document.getElementById(`isCompleted-${i}`);

    if (task._checkList) {
        completedElement.innerHTML = '<strong>SI</strong>';
        completedElement.style.color = 'rgb(69 131 61)'; // Verde para indicar completado
        div.style.backgroundColor = '#ffffff'; // Fondo gris para tareas completadas
    } else {
        if (timeDiff < 0) {
            div.style.backgroundColor = 'rgb(255, 69, 69)'; // Fondo rojo para tareas vencidas
            completedElement.style.color = '#ffffff';
            task._checkList = null;
            completedElement.innerHTML = '<strong>Unfulfilled Task!</strong>';
        } else {
            completedElement.innerHTML = '<strong>NO</strong>';
            completedElement.style.color = 'rgb(217 55 55)'; // Rojo para indicar no completado
        }
    }

    // Agregar event listeners a los botones
    const editBtn = document.getElementById(`btnTaskEdit-${i}`);
    const removeBtn = document.getElementById(`btnTaskRemove-${i}`);
    const doneBtn = document.getElementById(`btnTaskCheckList-${i}`);

    // Listener para el botón Editar
    editBtn.addEventListener("click", () => {
        let taskToEdit = getTaskById(task._idData);
        createformTask(taskToEdit);
        showTasks(...currentListDisplayed)
    });
    
    // Listener para el botón Eliminar
    removeBtn.addEventListener("click", () => {
        deleteTaskById(task._idData);
        showTasks(...currentListDisplayed);
    });
    
    // Listener para el botón Marcar como Hecho
    doneBtn.addEventListener("click", () => {
        let taskToEdit = getTaskById(task._idData);
        !taskToEdit._checkList ? taskToEdit._checkList = true : taskToEdit._checkList = false;
        updateTask(taskToEdit._idData, taskToEdit);
        showTasks(...currentListDisplayed);
    });
}
}
