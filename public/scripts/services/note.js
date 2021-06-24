import HttpService from './http-service.js';

export default class Note {
    constructor(id = undefined, title, description, importance, duedate, created = new Date(), finished = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.duedate = duedate;
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
            finished: false,
        };
        if (this.id) {
            return await HttpService.ajax('PUT', `/notes/${this.id}`, data);
        }
        // No ID set yet... so guess we're creating:
        return await HttpService.ajax('POST', '/', data);
    }
}
