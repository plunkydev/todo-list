let data = null;

// check if there is data from the app, if not create it by default
export function thereIsData() {
    if (!localStorage.getItem('generalTaskData')) {
        localStorage.setItem('generalTaskData', JSON.stringify({general: {}}));
        data = {};
    } else {
        data = JSON.parse(localStorage.getItem('generalTaskData'));
    }
}

export function saveProject(project) {
    // Verificar si el proyecto ya existe en data
    if (data.hasOwnProperty(project)) {
        alert(`${project} Already exists`);
    } else {
        data[project] = {}; // Agregar el nuevo proyecto a data
        localStorage.setItem('generalTaskData', JSON.stringify(data)); // Guardar data en localStorage
    }
}
