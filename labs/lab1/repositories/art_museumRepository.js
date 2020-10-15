const colors = require('colors');

const ArtMuseum = require('../models/art_museum');
const JsonStorage = require('../jsonStorage');



class ArtMuseumRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    getArtMuseums() {
        console.log('getArtMuseums'.bgGreen);
        const items = this.storage.readItems();
        let artMuseums = [];
        for (const item of Object.values(items)) {
            artMuseums.push(new ArtMuseum(
                item.id, item.name, item.country,
                item.founded, item.artistNum,
                item.exhibitNum));
        }
        return artMuseums;
    }

    getArtMuseumById(artMuseumid) {
        const artMuseums = this.getArtMuseums();
        for (const artMuseum of artMuseums) {
            if (artMuseum.id === artMuseumid) {
                return new ArtMuseum(artMuseum.id,
                    artMuseum.name, artMuseum.country,
                    artMuseum.founded, artMuseum.artistNum,
                    artMuseum.exhibitNum);
            }
        }
        return null;
    }

    addArtMuseum(artMuseumModel) {
        const artMuseums = this.getArtMuseums();
        artMuseumModel.id = this.storage.nextId;
        this.storage.incrementNextId();
        artMuseums.push(artMuseumModel);
        this.storage.writeItems({ items: artMuseums });
        return this.storage.nextId - 1;
    }

    updateArtMuseum(artMuseumModel) {
        const artMuseums = this.getArtMuseums();
        for (let i in artMuseums) {
            if (artMuseums[i].id === artMuseumModel.id) {
                artMuseums[i] = artMuseumModel;
                this.storage.writeItems({ items: artMuseums });
                return artMuseumModel.id;
            }
        }
        return null;
    }

    deleteArtMuseum(artMuseumId) {
        const artMuseums = this.getArtMuseums();
        for (let i in artMuseums) {
            if (artMuseums[i].id === artMuseumId) {
                artMuseums.splice(i, 1);
                this.storage.writeItems({ items: artMuseums });
                return artMuseumId;
            }
        }
        return null;
    }
};

module.exports = ArtMuseumRepository;

