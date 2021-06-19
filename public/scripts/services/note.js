export default class Note {
    constructor(title, description, importance, duedate, created, finished = false) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.duedate = duedate;
        this.created = created;
        this.finished = finished;
    }

    save() {
        // Todo
        console.log('todo... saves this instances to the db...');
        return;
    }
}
