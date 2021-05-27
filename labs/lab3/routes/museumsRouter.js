const express = require('express');

const router = express.Router();
const museumController = require('../controllers/museumsController');


router.get('/', museumController.getArtMuseums);

router.get('/:id', museumController.getArtMuseumById);

router.post('/', museumController.addArtMuseum);

router.delete('/:id', museumController.deleteArtMuseum);

//router.put('/', museumController.updateArtMuseum);

module.exports = router;