import express from 'express';

const router = express.Router();

//Todo


router.post('/', function (req, res) {
    res.send('Test');
});

export const noteRoutes = router;
