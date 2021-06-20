import Datastore from 'nedb-promise';
import Note from '../public/scripts/services/note.js';

export class NoteStore {
    constructor() {
        this.db = new Datastore({
            filename: './data/notes.db',
            autoload: true,
        });
    }

    async add(data) {
        const note = new Note(data.title, data.description, data.importance, data.duedate, data.created, false);
        return await this.db.insert(note);
    }

    async all() {
        return await this.db.cfind().exec();
    }
}

export const noteStore = new NoteStore();
