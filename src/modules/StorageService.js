import { createTask } from './createTask'

//check if there is data from the app, if not create it by default
export function thereIsData() {
    if (!localStorage.getItem('generalTaskData')) {
        const data = createTask('', '', '', '', false, '')
        localStorage.setItem('generalTaskData', JSON.stringify([data]));
    }
}

export function saveProject(project) {
    if (!localStorage.getItem(project)) {
        localStorage.setItem(project, JSON.stringify([]));
    } else {
        console.log(`${project} ya existe!`)
    }
}