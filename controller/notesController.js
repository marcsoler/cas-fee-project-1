import {noteStore} from '../services/noteStore.js';

export class NotesController {

    create = async (req, res) => {
        res.json(await noteStore.add(req.body));
    }

    getNotes = async (req, res) => {
        res.json(await noteStore.all() || []);
    }

}

export const notesController = new NotesController();
