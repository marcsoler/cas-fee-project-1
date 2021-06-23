import HttpService from './http-service.js';

export default class Note {
    constructor(id = undefined, title, description, importance, duedate, finished = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.duedate = duedate;
        this.created = new Date();
        this.finished = finished;
    }

    async save() {
        return await HttpService.ajax('POST', '/', {
            title: this.title,
            description: this.description,
            importance: this.importance,
            duedate: this.duedate,
            created: this.created,
            finished: false,
        });
    }
}
