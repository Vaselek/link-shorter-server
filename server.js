const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Link = require('./models/Link');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const port = 8000;

const links = require('./app/links');

mongoose.connect('mongodb://localhost/shop', {useNewUrlParser: true}).then(() => {
    app.use('/links', links);

    app.get('/:id', async (req, res) => {
        const shortUrl = req.params.id;
        const url = await Link.findOne({shortUrl})
        if (url) {
            return res.status(301).redirect(url.originalUrl);
        } else {
            return res.status(404).json('No such record');
        }
    });

    app.listen(port, () => {
        console.log(`Server started on ${port} port`)
    })
})