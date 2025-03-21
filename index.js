import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';

import Database from './database.js';

const db = new Database();
await db.initEmpty();
// TODO add user flow
const userID = await db.newUser('user');

const app = express();
const port = 5000;

app.use(express.static('public/dist'));
app.use(cors());
app.use(bodyParser.json());

// Slideshow
app.get('/api/slideshow/:id', (req, res) => {
    // TODO retrieve slideshow json, send it
    res.sendStatus(404);
});
app.post('/api/slideshow', async (req, res) => {
    // Create a new slideshow.
    const name = req.body?.name;
    const newSlideshowID = await db.newSlideshow(name);
    if (newSlideshowID === undefined) {
        res.send({ err: 'name' });
    } else {
        res.send({ id: newSlideshowID });
    }
});

// Images
app.get('/api/slideshow/:slideshowId/image/:imageId', (req, res) => {
    // TODO look up image for req.params.id, send it
    res.sendStatus(404);
});
app.post('/api/slideshow/:slideshowId/image', (req, res) => {
    // TODO store the image and return an ID
    res.sendStatus(404);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});