const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.static('public/dist'));

app.use(cors());
app.get('/api/items', (req, res) => {
    const data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});