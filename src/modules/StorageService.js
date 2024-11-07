import { showProjecs } from "./moduleProject";

let data = null;

// check if there is data from the app, if not create it by default
export function thereIsData() {
    if (!localStorage.getItem('generalTaskData')) {
        localStorage.setItem('generalTaskData', JSON.stringify({general: []}));
        data = {};
    }
}

export function saveProject(project) {
    // Verificar si el proyecto ya existe en data
    data = JSON.parse(localStorage.getItem('generalTaskData'));
    if (data.hasOwnProperty(project)) {
        alert(`${project} Already exists`);
    } else {
        data[project] = []; // Agregar el nuevo proyecto a data
        localStorage.setItem('generalTaskData', JSON.stringify(data)); // Guardar data en localStorage
    }
    showProjecs()
}
export function saveTask(task) {
    data = JSON.parse(localStorage.getItem('generalTaskData'));
    if (data.hasOwnProperty(task.project)) {
        data[task.project].push(task)
        localStorage.setItem('generalTaskData', JSON.stringify(data));
    }
}

export function getProjectsData() {
    let getProjects = [];
    data = JSON.parse(localStorage.getItem('generalTaskData'));
    for (const project in data) {
        getProjects.push(project)
    }
    return getProjects
}

