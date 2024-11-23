import { showProjecs } from "./moduleProject";
import { format, addDays, isWithinInterval, parseISO, isBefore, startOfDay } from "date-fns";

// check if there is data from the app, if not create it by default
export function thereIsData() {
    let datos = null;
    if (!localStorage.getItem('generalTaskData')) {
        localStorage.setItem('generalTaskData', JSON.stringify({general: []}));
        datos = JSON.parse(localStorage.getItem('generalTaskData'));
        return datos 
    } else {
        datos = JSON.parse(localStorage.getItem('generalTaskData'));
        return datos 
    }
}

let data = thereIsData();

export function saveProject(project) {
    // Verificar si el proyecto ya existe en data
    if (data.hasOwnProperty(project)) {
        alert(`${project} Already exists`);
    } else {
        data[project] = []; // Agregar el nuevo proyecto a data
        localStorage.setItem('generalTaskData', JSON.stringify(data)); // Guardar data en localStorage
    }
    showProjecs()
}
export function saveTask(task) {
    if (data.hasOwnProperty(task.project)) {
        data[task.project].push(task)
        localStorage.setItem('generalTaskData', JSON.stringify(data));
    }
}

export function getProjectsData() {
    let getProjects = [];
    for (const project in data) {
        getProjects.push(project)
    }
    return getProjects
}

export function deleteProject(project) {
    if (data.hasOwnProperty(project)) {
        delete data[project];
        localStorage.setItem('generalTaskData', JSON.stringify(data));
    }
}

export function getAllTasksData() {
    const allTasks = [];
    for (const project in data) {
        if (Array.isArray(data[project])) {
            allTasks.push(...data[project]);
        }
    }
    
    return allTasks;
}

export function deleteTaskById(idData) {

    for (const categoria in data) {
        if (Array.isArray(data[categoria])) {
            const index = data[categoria].findIndex(tarea => tarea._idData === idData);
            
            if (index !== -1) {
                data[categoria].splice(index, 1);
                localStorage.setItem('generalTaskData', JSON.stringify(data));
                return;
            }
        }
    }

}
export function getTaskById(idData) {
    for (const categoria in data) {
        if (Array.isArray(data[categoria])) {
            const index = data[categoria].findIndex(tarea => tarea._idData === idData);
            
            if (index !== -1) {
                const task = data[categoria][index];
                return task;
            }
        }
    }
}

export function updateTask(taskId, updatedTask) {
    for (let project in data) {
        if (data.hasOwnProperty(project)) {
            const index = data[project].findIndex(task => task._idData === taskId);
            if (index !== -1) {
                data[project][index] = { ...data[project][index], ...updatedTask };
                
                localStorage.setItem('generalTaskData', JSON.stringify(data));
                return;
            }
        }
    }
}

export function isCompleted(params) {
    const completedTasks = [];
    for (const project in data) {
        if (Array.isArray(data[project])) {
            data[project].forEach(task => {
                for (const key in task) {
                    if (task[key] === params) {
                        completedTasks.push(task)
                    } 
                }
            })
            
        }
    }
    
    return completedTasks;
}

export function todayTask(params) {
    const todayTasks = [];
    const today = format(new Date(), 'yyyy-MM-dd')
    for (const project in data) {
        if (Array.isArray(data[project])) {
            data[project].forEach(task => {
                for (const key in task) {
                    if (task[key] === today) {
                        todayTasks.push(task)
                    } 
                }
            })
            
        }
    }
    
    return todayTasks;
}

export function nextSevenDaysTasks() {
    const nextSevenDaysTasks = [];
    const today = new Date();
    const endDate = addDays(today, 7);

    for (const project in data) {
        if (Array.isArray(data[project])) {
            data[project].forEach(task => {
                const dueDate = parseISO(task._dueDate);
                if (isWithinInterval(dueDate, { start: today, end: endDate })) {
                    nextSevenDaysTasks.push(task);
                }
            });
        }
    }
    
    return nextSevenDaysTasks;
}

export function funUnfulfilledTask() {
    const pastDueTasks = [];
    const today = startOfDay(new Date());

    for (const project in data) {
        if (Array.isArray(data[project])) {
            data[project].forEach(task => {
                const dueDate = parseISO(task._dueDate);
                // Check if the task is overdue (strictly before today)
                if (!task._checkList && isBefore(dueDate, today)) {
                    pastDueTasks.push(task);
                }
            });
        }
    }

    return pastDueTasks;
}