const path = require('path');
const museumRepository = require('../repositories/museumRepository');
const MuseumRepository = new museumRepository(path.resolve(__dirname, '../data/museums.json'));
const museumProperty = Symbol('museum');

module.exports = {
    async getArtMuseums(req, res) {
        try {

            let museums = MuseumRepository.getMuseumsPaginated(Number(req.query.page), Number(req.query.per_page), req.query.name);
            let pagesNumber = MuseumRepository.getPagesNumber(Number(req.query.page), Number(req.query.per_page), req.query.name);
            let page = req.query.page;
            let name = req.query.name;
            if (!page) page = 1;
            else page = Number(page);
            let pages = { currentPage: Number(page) };

            if (page !== 1) pages.prevPage = page - 1;
            if (page !== pagesNumber) pages.nextPage = page + 1;
            if (name) pages.namePage = name;

            if (museums) {

                res.status(200).render('museums', { museums: museums, pagesNumber: pagesNumber, pages: pages});

            }
            else {

                res.status(404).send({ museums: null, message: "Not found." });

            }

        } catch (err) {

            console.log(err.message);
            res.status(500).send({ photos: null, message: 'Server error.' });

        }
    },
    getArtMuseumById(req, res) {
        console.log(req.params.id);

        const museum = museumRepository.getPhotoById(parseInt(req.params.id));


        if (museum) {

            res.status(200).render('photo', { photo: museum });

        }
        else {

            res.status(404).send({ photo: null, message: "Not found." });

        }
    },
    addArtMuseum(req, res) {
        try {
            const museum = museumRepository.getArtMuseumById(museumRepository.addArtMuseum(req.body));
            res.send(museum);
            res.status(201);
            res.end();
        } catch (error) {
            res.sendStatus(400);
        }
    },
    deleteArtMuseum(req, res) {
        museumRepository.deleteArtMuseum(req[museumProperty].id);
        res.send(req[museumProperty]);
    },
    updateArtMuseum(req, res) {
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