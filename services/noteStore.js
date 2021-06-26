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
        return await this.db.insert(note);
    }

    async all() {
        return await this.db.cfind().exec();
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async delete(id) {
        return await this.db.remove({_id: id});
    }

    async update(id, data) {
        return await this.db.update({_id: id}, { $set: { title: data.title, description: data.description, importance: data.importance, duedate: data.duedate, finished: data.finished } });
    }
}

export const noteStore = new NoteStore();
