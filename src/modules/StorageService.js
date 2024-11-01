import { createTask } from './createTask'

//check if there is data from the app, if not create it by default
export function thereIsData() {
    const data = createTask('', '', '', '', false, '')
    if (!localStorage.getItem('generalTaskData')) {
        localStorage.setItem('generalTaskData', JSON.stringify([data]));
    }
}

