import Note from './note.js';
import HttpService from './http-service.js';

class NoteService {
    constructor() {
        this.notes = [];
    }

    createNote(data) {
        const note = new Note(data.title.value, data.description.value, data.importance.value, data.duedate.value, false);
        note.save();
    }

    async getNotes() {
//        const notes = await httpService.ajax('GET', '/notes', undefined);
//        for (const note of notes) {
//            this.notes.push(new Note(note.title, note.description, note.importance, note.duedate, note.created, note.finished));
//        }
        return await HttpService.ajax('GET', '/notes', undefined);
    }
}

export const noteService = new NoteService();
