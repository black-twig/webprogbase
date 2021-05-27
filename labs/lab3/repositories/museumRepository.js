const ArtMuseum = require('../models/museum');
const JsonStorage = require('../jsonStorage');



class ArtMuseumRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    getArtMuseums() {
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


    getMuseumsPaginated(page, per_page, name) {

        const page_size = 3;
        const maxPageSize = 3;

        if (per_page) {
            if (per_page > maxPageSize) {
                console.log("Error.");
                return 1;
            }
        }
        else {
            per_page = page_size;
        }
        if (!page) {
            page = 1;
        }
        const museums = this.getArtMuseums();
        const museumNumber = Number(museums.length);
        const offset = per_page * (page - 1);
        if (museumNumber <= offset) {
            console.log("Error.");
            return 1;
        }
        let museums_res = [];
        if (name) {
            for (let i = 0; i < museums.length; i++) {

                if (museums[i].name.includes(name)) {
                    museums_res.push(museums[i]);
                }
            }
            museums_res = museums_res.slice(offset, offset + per_page);
        }
        const cur_museums = museums.slice(offset, offset + per_page);
        if (name) {
            return museums_res;
        }
        return cur_museums;

    }


    getPagesNumber(page, per_page, name) {

        const page_size = 3;
        const maxPageSize = 3;

        if (per_page) {
            if (per_page > maxPageSize) {
                console.log("Error.");
                return 1;
            }
        }
        else {
            per_page = page_size;
        }
        if (!page) {
            page = 1;
        }

        const museums = this.getArtMuseums();
        const museumNumber = Number(museums.length);
        const offset = per_page * (page - 1);

        if (museumNumber <= offset) {

            console.log("Error.");

            return 1;

        }

        let museums_res = [];
        let tempLen = 0;

        if (name) {
            for (let i = 0; i < museums.length; i++) {
                if (museums[i].name.includes(name)) {
                    museums_res.push(museums[i]);
                }
            }
            tempLen = museums_res.length;
            museums_res = museums_res.slice(offset, offset + per_page);
        }

        let pagesNumber = 0;
        if ((museumNumber / per_page) - Math.trunc(museumNumber / per_page) !== 0) {
            pagesNumber = Math.trunc(museumNumber / per_page) + 1;
        }
        else {
            pagesNumber = Math.trunc(museumNumber / per_page);
        }

        if (name) {

            if ((tempLen / per_page) - Math.trunc(tempLen / per_page) !== 0) {
                pagesNumber = Math.trunc(tempLen / per_page) + 1;
            }
            else {
                pagesNumber = Math.trunc(tempLen / per_page);
            }
            if (pagesNumber === 0) {
                pagesNumber = 1;
            }
            return pagesNumber;
        }
        if (pagesNumber === 0) {
            pagesNumber = 1;
        }
        return pagesNumber;

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

