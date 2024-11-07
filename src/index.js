import { createformTask } from "./modules/moduleTask"
import { createformProject } from "./modules/moduleProject"
import { thereIsData } from "./modules/StorageService"
thereIsData();

// Añadir el evento al botón después de que se haya añadido al DOM
const btnFormTask = document.getElementById("btnAddTask");
btnFormTask.addEventListener("click", createformTask);
const btnFormProject = document.getElementById("addProject");
btnFormProject.addEventListener("click", createformProject);