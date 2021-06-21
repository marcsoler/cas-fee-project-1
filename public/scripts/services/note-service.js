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

    async updateNote(id, data) {
        return await HttpService.ajax('PUT', `/notes/${id}`, {
            title: data.title.value,
            description: data.description.value,
            importance: data.importance.value,
            duedate: data.duedate.value,
            finished: false,
        });
    }

    async deleteNote(id) {
        return await HttpService.ajax('DELETE', `/notes/${id}`, undefined);
    }
}

export const noteService = new NoteService();
