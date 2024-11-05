import { createformTask } from "./modules/formTask"
import { createformProject } from "./modules/formProject"
import { thereIsData } from "./modules/StorageService"
thereIsData();

// Añadir el evento al botón después de que se haya añadido al DOM
const btnFormTask = document.getElementById("btnAddTask");
btnFormTask.addEventListener("click", createformTask);
const btnFormProject = document.getElementById("addProject");
btnFormProject.addEventListener("click", createformProject);