import {noteStore} from '../services/noteStore.js';

export class NotesController {
    async createNote(req, res) {
        res.json(await noteStore.add(req.body));
    }

     async getAllNotes(req, res) {
        res.json(await noteStore.all() || []);
    }

     async getNote(req, res) {
        res.json(await noteStore.get(req.params.id));
    }

     async deleteNote(req, res) {
        res.json(await noteStore.delete(req.params.id));
    }

     async updateNote(req, res) {
        res.json(await noteStore.update(req.params.id, req.body));
    }
}

export const notesController = new NotesController();
