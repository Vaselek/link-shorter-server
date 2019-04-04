const express = require('express');
const validUrl = require('valid-url');
const shortId = require('shortid');

const Link = require('../models/Link');

const router = express.Router();

router.post('/', (req, res) => {
    const linkData = req.body;
    const originalUrl = linkData.originalUrl;
    if (!validUrl.isUri(originalUrl)) {
        return res.status(401).json("Invalid Original URL")
    }
    const shortUrl = shortId.generate();
    linkData.shortUrl = shortUrl;
    const link = new Link(linkData);
    link.save()
        .then(result => res.send(result))
        .catch((error) => res.sendStatus(400).send(error));
});

module.exports = router;



