import { format } from "date-fns";


class Task {
    static idCount = 0;
    constructor(title, description, dueDate, priority, checkList, project) {
        this._idData = `${++Task.idCount}:${title}`;
        this._title = title === "" ? "Undefined Task" : title;
        this._description = description === "" ? "Undefined Description" : description;
        this._dueDate = dueDate === "" ? format(new Date(), 'yyyy-MM-dd') : dueDate;
        this._priority = priority === "" ? "low" : priority;
        this._checkList = typeof checkList === 'boolean' ? checkList : false;
        this._project = project === "" ? 'general' : project;
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
    get project() {
        return this._project;
    }
    get idData() {
        return this._idData;
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
    set project(value) {
        this._project = value;
    }
}

export function createTask(title, description, dueDate, priority, checkList, project) {
    let task = new Task(title, description, dueDate, priority, checkList, project);
    return task;
};
