const express = require('express');
const router = express.Router();
const tourController = require('../controller/tourController');
// 3) ROUTE
// TOUR
router.param('id', tourController.checkId);
router
    .route('/')
    .get(tourController.getAllTour)
    .post(tourController.checkBody, tourController.createTour);
router
    .route('/:id')
    .get(tourController.getTour)
    .delete(tourController.deleteTour)
    .patch(tourController.updateTour);
// USER

module.exports = router;