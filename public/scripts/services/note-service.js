import Note from './note.js';
import {httpService} from './http-service.js';

class NoteService {
    constructor() {
        this.notes = [];
    }

    createNote(data) {
        const created = new Date().toISOString().split('T')[0];
        const note = new Note(data.title.value, data.description.value, data.importance.value, data.duedate.value, created, false);
        note.save();
    }

    async getNotes() {
        return await httpService.ajax('GET', '/notes', undefined);
    }
}

export const noteService = new NoteService();
