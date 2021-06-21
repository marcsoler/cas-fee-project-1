import express from 'express';
import {notesController} from '../controller/notesController.js';

const router = express.Router();

router.post('/', notesController.createNote);
router.get('/notes', notesController.getAllNotes);
router.get('/notes/:id/', notesController.getNote);
router.post('/notes/:id/', notesController.updateNote);
router.delete('/notes/:id/', notesController.deleteNote);

export const noteRoutes = router;
