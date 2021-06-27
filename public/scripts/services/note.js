import HttpService from './http-service.js';

export default class Note {
    constructor(id = undefined, title, description, importance, duedate, created = new Date(), finished = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.duedate = new Date(duedate);
        this.created = created;
        this.finished = finished;
    }

    setId(id) {
        this.id = id;
    }

    async save() {
        const data = {
            title: this.title,
            description: this.description,
            importance: this.importance,
            duedate: this.duedate,
            created: this.created,
            finished: this.finished,
        };
        if (this.id) {
            return HttpService.ajax('PUT', `/notes/${this.id}`, data);
        }
        // No ID set yet... so guess we're creating:
        return HttpService.ajax('POST', '/notes', data);
    }
}
