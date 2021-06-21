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

    async getNote(id) {
        return await HttpService.ajax('GET', `/notes/${id}`, undefined);
    }

    async getNotes() {
        return await HttpService.ajax('GET', '/notes', undefined);
    }

    async updateNote(data) {
        return await HttpService.ajax('POST', `/notes/${data.noteId}`, {
            title: this.title,
            description: this.description,
            importance: this.importance,
            duedate: this.duedate,
            finished: false,
        });
    }

    async deleteNote(id) {
        return await HttpService.ajax('DELETE', `/notes/${id}`, undefined);
    }
}

export const noteService = new NoteService();
