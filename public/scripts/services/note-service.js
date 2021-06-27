import Note from './note.js';
import HttpService from './http-service.js';

class NoteService {
    constructor() {
        this.notes = [];
    }

    createNote(data) {
        const note = new Note(undefined, data.title.value, data.description.value, data.importance.value, data.duedate.value);
        note.save().then((v) => {
            // eslint-disable-next-line no-underscore-dangle
            note.setId(v._id);
        });
        return note;
    }

    async updateNote(id, data) {
        const note = await this.getNote(id);

        note.title = data.title.value;
        note.description = data.description.value;
        note.importance = data.importance.value || 1;
        note.duedate = data.duedate.value || new Date('2021-01-01');
        // note.finished = false; // Todo

        await note.save();
        return note;
    }

    async getNote(id) {
        const note = await HttpService.ajax('GET', `/notes/${id}`, undefined);
        // eslint-disable-next-line no-underscore-dangle
        return new Note(note._id, note.title, note.description, note.importance, note.duedate, note.finished);
    }

    async getNotes() {
        this.notes = [];
        const notes = await HttpService.ajax('GET', '/notes', undefined);
        notes.forEach((note) => {
            // eslint-disable-next-line no-underscore-dangle
            this.notes.push(new Note(note._id, note.title, note.description, note.importance, note.duedate, note.created, note.finished));
        });
        return this.notes;
    }

    async deleteNote(id) {
        return HttpService.ajax('DELETE', `/notes/${id}`, undefined);
    }

    async setAsDone(id) {
        const note = await this.getNote(id);
        note.finished = true;
        note.save();
        return note;
    }

    sortNotes(field) {
        switch (field) {
            case 'importance':
                this.notes.sort((a, b) => (a.importance > b.importance ? 1 : (b.importance > a.importance ? -1 : 0)));
                break;
            case 'finish':
                this.notes.sort((a, b) => new Date(b.duedate) - new Date(a.duedate));
                break;
            case 'created':
                this.notes.sort((a, b) => new Date(b.created) - new Date(a.created));
                break;
            default:
                break;
        }
        return this.notes;
    }
}

// eslint-disable-next-line import/prefer-default-export
export const noteService = new NoteService();
