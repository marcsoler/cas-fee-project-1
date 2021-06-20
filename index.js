import express from 'express';
import bodyParser from 'body-parser';
import {noteRoutes} from './routes/noteRoutes.js';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(noteRoutes);

const port = 3000;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
