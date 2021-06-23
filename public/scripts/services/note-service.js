import Note from './note.js';
import HttpService from './http-service.js';

class NoteService {
    constructor() {
        this.notes = [];
    }

    createNote(data) {
        const note = new Note(
            undefined,
            data.title.value,
            data.description.value,
            data.importance.value,
            data.duedate.value,
            false,
        );
        note.save().then((v) => {
            note.setId(v._id);
        });
        return note;
    }

    async updateNote(id, data) {
        const note = await this.getNote(id);

        note.title = data.title.value;
        note.description = data.description.value;
        note.importance = data.importance.value;
        note.duedate = data.importance.value;
        note.finished = false; // Todo

        await note.save();
        return note;
    }

    async getNote(id) {
        const note = await HttpService.ajax('GET', `/notes/${id}`, undefined);
        return new Note(note._id, note.title, note.description, note.importance, note.duedate, note.finished);
    }

    async getNotes() {
        const notes = await HttpService.ajax('GET', '/notes', undefined);
        notes.forEach((note) => {
           this.notes.push(new Note(note._id, note.title, note.description, note.importance, note.duedate, note.finished));
        });
        return this.notes;
    }

    async deleteNote(id) {
        return await HttpService.ajax('DELETE', `/notes/${id}`, undefined);
    }
}

export const noteService = new NoteService();
