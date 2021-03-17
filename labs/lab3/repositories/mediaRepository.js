const fs = require('fs');

const Media = require('../models/media');

class MediaRepository {

    constructor(storage) {
        this.storage = storage;
    }
    addMedia(media) {
        const nextMediaId = JSON.parse(fs.readFileSync(`${this.storage}/media_id.json`));
        const path = `${this.storage}/${nextMediaId.nextId}`;
        fs.renameSync(media.path, path);
        nextMediaId.nextId += 1;
        fs.writeFileSync(`${this.storage}/media_id.json`, JSON.stringify(nextMediaId, null, 4));
        return nextMediaId.nextId - 1;
    }
    getMediaById(mediaId) {
        const path = `${this.storage}/${mediaId}`;
        if (fs.existsSync(path))
            return new Media(path);
        return null;
    }
}

module.exports = MediaRepository;