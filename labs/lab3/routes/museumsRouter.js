const express = require('express');

const router = express.Router();
const museumController = require('../controllers/museumsController');


router.get("/new", (req, res) => { res.status(200).render('new') ;});

router.get('/', museumController.getArtMuseums);

router.get('/:id', museumController.getArtMuseumById);

router.post('/', museumController.addArtMuseum);

router.post("/:id", museumController.deleteArtMuseum);

//router.put('/', museumController.updateArtMuseum);

module.exports = router;