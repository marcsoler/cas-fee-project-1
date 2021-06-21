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

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async delete(id) {
        console.log(`Delete note #${id}`);
        // return await this.db.update({_id: id}, {$set: {state: 'DELETED'}});
        return await this.db.remove({_id: id});
    }

    async update(data) {
        console.log('will update this soon');
        // Todo
        // return await this.db.update({_id: data.noteId}, { $set: { data.title, data.description, data.importance, data.duedate, data.created, false }});
    }
}

export const noteStore = new NoteStore();
