import {noteStore} from '../services/noteStore.js';

export class NotesController {

    createNote = async (req, res) => {
        res.json(await noteStore.add(req.body));
    }

    getAllNotes = async (req, res) => {
        res.json(await noteStore.all() || []);
    }

    getNote = async (req, res) => {
        console.log(`Get note #${req.params.id}`);
        res.json(await noteStore.get(req.params.id));
    }

    deleteNote = async (req, res) => {
        res.json(await noteStore.delete(req.params.id));
    }

    updateNote = async (req, res) => {
        res.json(await noteStore.update(req.body));
    }



}

export const notesController = new NotesController();
