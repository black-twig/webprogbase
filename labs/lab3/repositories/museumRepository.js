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
                item.exhibitNum, item.imageUrl));
        }
        return artMuseums;
    }


    getMuseumsPaginated(page, per_page, name) {

        const museums = this.getArtMuseums();
        const museumNumber = Number(museums.length);

        let museums_res = [];
        if (name) {
            for (let i = 0; i < museumNumber; i++) {

                if (museums[i].name.includes(name)) {
                    museums_res.push(museums[i]);
                }
            }
        }
        else {
             museums_res = museums;
        }
        // let's do a pagging
        let paging = this.paginate(museums_res.length, page, per_page);
        museums_res = museums_res.slice(paging.startIndex, paging.endIndex+1);

        return {
            museums_res: museums_res,
            currentPage: paging.currentPage,
            totalPages: paging.totalPages
        };

    }

    paginate( totalItems, currentPage, pageSize ) 
    {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
    
        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
    
        // calculate start and end item indexes in the search results
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    
        // return object with all pager properties required by the results-view
        return {
            currentPage: currentPage,
            totalPages: totalPages,
            startIndex: startIndex,
            endIndex: endIndex
        };
    }

    getArtMuseumById(artMuseumid) {
            const artMuseums = this.getArtMuseums();
            for (const artMuseum of artMuseums) {
                if (artMuseum.id === artMuseumid) {
                    return new ArtMuseum(artMuseum.id,
                        artMuseum.name, artMuseum.country,
                        artMuseum.founded, artMuseum.artistNum,
                        artMuseum.exhibitNum, artMuseum.imageUrl);
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

