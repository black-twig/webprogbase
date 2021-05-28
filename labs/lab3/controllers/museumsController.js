const path = require('path');
const MuseumRepository = require('../repositories/museumRepository');
const museumRepository = new MuseumRepository(path.resolve(__dirname, '../data/museums.json'));
const museumProperty = Symbol('museum');
const MediaRepository = require('./../repositories/mediaRepository');
const mediaRepository = new MediaRepository(path.resolve(__dirname, '../data/media'));
const Museum = require('../models/museum');

module.exports = {
    async getArtMuseums(req, res) {
        try {
            let page = req.query.page;
            let name = req.query.name;
            const page_size = 3;

            if (!page) page = 1;
            else page = Number(page);

            let result = museumRepository.getMuseumsPaginated(Number(page), page_size, name);
            let museums = result.museums_res;
            let pagesNumber = Number(result.totalPages);

            let pages = { currentPage: Number(result.currentPage) };

            if (page !== 1) pages.prevPage = page - 1;
            if (page !== pagesNumber) pages.nextPage = page + 1;
            if (name) pages.namePage = name;

            res.status(200).render('museums', { museums: museums, pagesNumber: pagesNumber, pages: pages});

        } catch (err) {

            console.log(err.message);
            res.status(500).send({ museums: null, message: 'Server error.' });

        }
    },
    async getArtMuseumById(req, res) {
        console.log(req.params.id);

        const museum = museumRepository.getArtMuseumById(parseInt(req.params.id));


        if (museum) {

            res.status(200).render('museum', { museum: museum });

        }
        else {

            res.status(404).send({ museum: null, message: "Museum id is incorrect." });

        }
    },
    async  addArtMuseum(req, res) {

        const imageUrl = mediaRepository.addMedia(req.files['imageUrl']);

        console.log(req.body);
        const new_museum = new Museum(-1, req.body.Mname, req.body.country, req.body.founded, Number(req.body.artistNum), Number(req.body.exhibitNum), imageUrl);
        const newId = museumRepository.addArtMuseum(new_museum);
        console.log(newId);
        res.redirect('/museums/' + newId);
    },
  
    async  deleteArtMuseum(req, res) {
        museumRepository.deleteArtMuseum(Number(req.params.id));
        res.redirect('/museums');
    },
    
    async updateArtMuseum(req, res) {
        if (!req.body)
            res.sendStatus(400);
        else {
            const museum = museumRepository.getArtMuseumById(req.body.id);
            if (museum) {
                museumRepository.updateArtMuseum(req.body);
                res.send(museumRepository.getArtMuseumById(req.body.id));
                res.end();
            }
            else
                res.sendStatus(404);
        }
    }
};