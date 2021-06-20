import {noteStore} from '../services/noteStore.js';

export class NotesController {

    create = async (req, res) => {
        res.json(await noteStore.add(req.body));
    }

}

export const notesController = new NotesController();
