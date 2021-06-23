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

    async updateNote(id, data) {
        return await HttpService.ajax('PUT', `/notes/${id}`, {
            title: data.title.value,
            description: data.description.value,
            importance: data.importance.value,
            duedate: data.duedate.value,
            finished: false,
        });
    }

    async getNote(id) {
        const note = await HttpService.ajax('GET', `/notes/${id}`, undefined);
        return new Note(note.title, note.description, note.importance, note.duedate, note.finished);
    }

    async getNotes() {
        const notes = await HttpService.ajax('GET', '/notes', undefined);
        notes.forEach((note) => {
           this.notes.push(new Note(note.id, note.title, note.description, note.importance, note.duedate, note.finished));
        });
        return this.notes;
    }

    async deleteNote(id) {
        return await HttpService.ajax('DELETE', `/notes/${id}`, undefined);
    }
}

export const noteService = new NoteService();
