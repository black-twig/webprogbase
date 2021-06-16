const MuseumRepository = require('../repositories/museumRepository');
const museumProperty = Symbol('museum');
const museumRepository = new MuseumRepository('data/museums.json');

module.exports = {
    getArtMuseums(req, res) {
        const page = Number(req.query.page);
        const perPage = Number(req.query.per_page);
        const museums = museumRepository.getArtMuseums();
        if (page && perPage) {
            res.send(museums.slice((page - 1) * perPage, page * perPage));
        }
        else
            res.send(museums);
        res.end();
    },
    getArtMuseumById(req, res) {
        res.send(req[museumProperty]);
        res.end();
    },
    getArtMuseumByIdHandler(req, res, next) {
        const museum = museumRepository.getArtMuseumById(parseInt(req.params.id));
        if (museum) {
            req[museumProperty] = museum;
            next();
        }
        else
            res.sendStatus(404);
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