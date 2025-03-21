import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';

import Database from './database';
const db = new Database();
process.on('exit', (code) => {
    db.close();
});

const app = express();
const port = 5000;

app.use(express.static('public/dist'));
app.use(cors());
app.use(bodyParser.json());

// TODO routes here

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});