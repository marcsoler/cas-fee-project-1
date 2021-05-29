import Note from './note.js';

export default class NoteService {
    constructor() {
        this.notes = [];

        this.notes.push(new Note('Erstes Todo!', 'Lorem ipsum dolo', 3, '2021-05-31', '2021-05-29', false));
        this.notes.push(new Note('Zweites Todo!', 'Lorem ipsum dolo', 5, '2021-05-31', '2021-05-29', false));
        this.notes.push(new Note('Drittes Todo!', 'Lorem ipsum dolo', 2, '2021-07-20', '2021-05-29', true));
    }

    get all() {
        return this.notes;
    }

    get allUnfinished() {
        return this.notes.filter((note) => !note.finished);
    }

    get allFinished() {
        return this.notes.filter((note) => note.finished);
    }
}
