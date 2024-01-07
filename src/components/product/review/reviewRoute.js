const express = require('express');
const reviewController = require('./reviewController');

let reviewRoute = express.Router();
reviewRoute.get('/:productid', reviewController.getProductReviewPage);

reviewRoute.post('/:productid/submit-review', reviewController.submitReview);



module.exports = reviewRoute;