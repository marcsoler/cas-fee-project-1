export default class NoteService {
    constructor() {
        this.notes = [];
    }

    get all() {
        return this.notes;
    }
}
