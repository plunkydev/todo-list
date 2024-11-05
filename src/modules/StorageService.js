import { createTask } from './createTask'

//check if there is data from the app, if not create it by default
export function thereIsData() {
    if (!localStorage.getItem('generalTaskData')) {
        localStorage.setItem('generalTaskData', JSON.stringify([]));
    }
}

export function saveProject(project) {
    if (!localStorage.getItem(project)) {
        localStorage.setItem(project, JSON.stringify([]));
    } else {
        console.log(`${project} ya existe!`)
    }
}