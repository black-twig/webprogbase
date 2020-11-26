const MediaRepository = require('../repositories/mediaRepository');
const mediaRepository = new MediaRepository('data/media');
const Media = require('../models/media');

module.exports = {
    getMediaById(req, res) {
        const media = mediaRepository.getMediaById(req.params.id);
        if (media)
            res.sendFile(media.path);
        else
            res.sendStatus(404);
    },
    addMedia(req, res)
    {
        try {
            const id = mediaRepository.addMedia(new Media(req.file.path));
            res.status(201).json(id).end();
        } catch (error) {
            res.sendStatus(400);
        }
    }
};