import { createformTask, showTasks } from "./modules/moduleTask"
import { createformProject, showProjecs } from "./modules/moduleProject"
import { thereIsData } from "./modules/StorageService"
import "./styles.css"

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todos los elementos que deseas que respondan al clic
    const elements = document.querySelectorAll('.clickable');

    // Iteramos sobre cada elemento y le agregamos un evento de clic
    elements.forEach(element => {
        element.addEventListener('click', () => {
            // Quitamos la clase 'clicked' de todos los elementos
            elements.forEach(el => el.classList.remove('clicked'));

            // Al hacer clic, le agregamos la clase 'clicked' solo al elemento seleccionado
            element.classList.add('clicked');
        });
    });
});



thereIsData();
showProjecs();
showTasks()

// Añadir el evento al botón después de que se haya añadido al DOM
const btnFormTask = document.getElementById("btnAddTask");
btnFormTask.addEventListener("click", createformTask);
const btnFormProject = document.getElementById("addProject");
btnFormProject.addEventListener("click", createformProject);
const btnComplete = document.getElementById("btnComplete");
btnComplete.addEventListener("click", () => showTasks(null, "complete", null, null, null));
const btnNotComplete = document.getElementById("btnNotComplete");
btnNotComplete.addEventListener("click", () => showTasks(null, 'not complete', null, null, null));
const btnTodayTasks = document.getElementById("btnTodayTasks");
btnTodayTasks.addEventListener("click", () => showTasks(null, null, 'today', null, null));
const btnNext7Days = document.getElementById("btnNext7Days");
btnNext7Days.addEventListener("click", () => showTasks(null, null, null, 'next7Days', null));
const btnUnfulfilledTask = document.getElementById("btnUnfulfilledTask");
btnUnfulfilledTask.addEventListener("click", () => showTasks(null, null, null, null, 'unfulfilledTask'));