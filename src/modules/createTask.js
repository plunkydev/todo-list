class Task {
    constructor(title, description, dueDate, priority, checkList) {
        this._title = title === "" ? "Undefined Task" : title;
        this._description = description === "" ? "Undefined Description" : description;
        this._dueDate = dueDate === "" ? new Date() : dueDate;
        this._priority = priority === "" ? "Undefined Priority" : priority;
        this._checkList = typeof checkList === 'boolean' ? checkList : false;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }
    get dueDate() {
        return this._dueDate;
    }
    get priority() {
        return this._priority;
    }
    get checkList() {
        return this._checkList;
    }

    set title(value) {
        this._title = value;
    }
    set description(value) {
        this._description = value;
    }
    set dueDate(value) {
        this._dueDate = value;
    }
    set priority(value) {
        this._priority = value;
    }
    set checkList(value) {
        this._checkList = typeof value === 'boolean' ? value : false;
    }
}

export function createTask(title, description, dueDate, priority, checkList) {
    let task = new Task(title, description, dueDate, priority, checkList);
    return task;
};
