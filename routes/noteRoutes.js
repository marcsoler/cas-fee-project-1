import express from 'express';
import {notesController} from '../controller/notesController.js';

const router = express.Router();

// Todo

router.post('/', notesController.create);

export const noteRoutes = router;
