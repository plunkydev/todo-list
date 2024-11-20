import { createformTask, showTasks } from "./modules/moduleTask"
import { createformProject, showProjecs } from "./modules/moduleProject"
import { thereIsData } from "./modules/StorageService"
import "./styles.css"
thereIsData();
showProjecs();
showTasks()

// Añadir el evento al botón después de que se haya añadido al DOM
const btnFormTask = document.getElementById("btnAddTask");
btnFormTask.addEventListener("click", createformTask);
const btnFormProject = document.getElementById("addProject");
btnFormProject.addEventListener("click", createformProject);
const btnComplete = document.getElementById("btnComplete");
btnComplete.addEventListener("click", () => showTasks(null, "complete"));
const btnNotComplete = document.getElementById("btnNotComplete");
btnNotComplete.addEventListener("click", () => showTasks(null, 'not complete'));
const btnTodayTasks = document.getElementById("btnTodayTasks");
btnTodayTasks.addEventListener("click", () => showTasks(null, null, 'today'));
const btnNext7Days = document.getElementById("btnNext7Days");
btnNext7Days.addEventListener("click", () => showTasks(null, null, null, 'next7Days'));