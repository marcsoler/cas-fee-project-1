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
        const note = new Note(undefined, data.title, data.description, data.importance, data.duedate, data.created, data.finished);
        return this.db.insert(note);
    }

    async all() {
        return this.db.cfind().exec();
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async delete(id) {
        return this.db.remove({_id: id});
    }

    async update(id, data) {
        return this.db.update({_id: id}, { $set: { title: data.title, description: data.description, importance: data.importance, duedate: data.duedate, finished: data.finished } });
    }
}

export const noteStore = new NoteStore();
