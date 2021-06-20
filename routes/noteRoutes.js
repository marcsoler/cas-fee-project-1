import express from 'express';
import {notesController} from '../controller/notesController.js';

const router = express.Router();

router.post('/', notesController.createNote);
router.get('/notes', notesController.getNotes);

export const noteRoutes = router;
