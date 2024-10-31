import { createTask } from "./createTask";

export function createformTask() {
    const div = document.createElement("div");
    div.classList.add("formTaskContainer");
    div.innerHTML = `
        <form id="taskForm">
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
    
    const content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(div);
    const btnSubmitTask = document.getElementById('btnSubmitTask');
    btnSubmitTask.addEventListener("click", function (event) {
        event.preventDefault();
        
        const task = createTask(document.getElementById('title').value, document.getElementById('description').value, document.getElementById('dueDate').value, document.getElementById('priority').value, document.getElementById('completed').checked);

        console.log(task);
        // Aquí podrías llamar a una función para guardar en localStorage, como saveTasks(task)

        // Limpiar el formulario después de enviarlo
        document.getElementById('taskForm').reset();
    }
    );
};