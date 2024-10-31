import { createformTask } from "./modules/formTask"

// Añadir el evento al botón después de que se haya añadido al DOM
const btnFormTask = document.getElementById("btnAddTask");
btnFormTask.addEventListener("click", createformTask);