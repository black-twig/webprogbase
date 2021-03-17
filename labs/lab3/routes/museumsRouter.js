const express = require('express');

const router = express.Router();
const museumController = require('../controllers/museumsController');


router.get('/', museumController.getArtMuseums);

router.get('/:id', museumController.getArtMuseumByIdHandler, museumController.getArtMuseumById);

router.post('/', museumController.addArtMuseum);

router.delete('/:id', museumController.getArtMuseumByIdHandler, museumController.deleteArtMuseum);

router.put('/', museumController.updateArtMuseum);

module.exports = router;