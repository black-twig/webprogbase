const express = require('express');

const router = express.Router();
const museumController = require('../controllers/museumsController');

/**
 * To get all museums on page
 * @route GET /api/museums
 * @group Museums - museum operations
 * @param {integer} page.query - page number
 * @param {integer} per_page.query - items per page
 * @returns {Museum[]} 200 - Museum object
 */
router.get('/', museumController.getArtMuseums);

/**
 * To get one museum by its id
 * @route GET /api/museums/{id}
 * @group Museums - museum operations
 * @param {integer} id.path.required - id of the Museum - eg: 1
 * @returns {Museum.model} 200 - Museum object
 * @returns {Error} 404 - Museum not found
 */
router.get('/:id', museumController.getArtMuseumByIdHandler, museumController.getArtMuseumById);

/**
 * To add new museum
 * @route POST /api/museums
 * @group Museums - museum operations
 * @param {Museum.model} id.body.required - new Museum object
 * @returns {Museum.model} 201 - added Museum object
 * @returns {Error} 400 - Museum not correct
 */
router.post('/', museumController.addArtMuseum);

/**
 * To delete a museum by its id
 * @route DELETE /api/museums/{id}
 * @group Museums - museum operations
 * @param {integer} id.path.required - id of the Museum - eg: 1
 * @returns {Museum.model} 200 - deleted Museum object
 */
router.delete('/:id', museumController.getArtMuseumByIdHandler, museumController.deleteArtMuseum);

/**
 * TODO: Add some comment here
 * @route PUT /api/museums
 * @group Museums - museum operations
 * @param {Museum.model} id.body.required - new Museum object
 * @returns {Museum.model} 200 - changed Museum object
 * @returns {Error} 404 - Museum not found
 * @returns {Error} 400 - Museum not correct
 */
router.put('/', museumController.updateArtMuseum);

module.exports = router;