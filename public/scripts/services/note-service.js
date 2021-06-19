import Note from './note.js';

class NoteService {
    constructor() {
        this.notes = [];
    }

    createNote(data) {
        const created = new Date().toISOString().split('T')[0];
        console.log('Created', created);
        console.log('Due', data.duedate.value);
        const note = new Note(data.title.value, data.description.value, data.importance.value, data.duedate.value, new Date(), false);
        // note.save();
    }
}

export const noteService = new NoteService();
