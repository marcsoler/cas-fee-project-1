import {httpService} from './http-service.js';

export default class Note {
    constructor(title, description, importance, duedate, created, finished = false) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.duedate = duedate;
        this.created = created;
        this.finished = finished;
    }

    async save() {
        return await httpService.ajax('POST', '/', {
            title: this.title,
            description: this.description,
            importance: this.importance,
            duedate: this.duedate,
            created: this.created,
            finished: false,

        });
    }
}
