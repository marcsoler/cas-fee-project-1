import Note from './note.js';

class NoteService {
    constructor() {
        this.notes = [];
    }

    createNote(data) {
        const created = new Date().toISOString().split('T')[0];
        const note = new Note(data.title.value, data.description.value, data.importance.value, data.duedate.value, created, false);
        note.save();
    }
}

export const noteService = new NoteService();
