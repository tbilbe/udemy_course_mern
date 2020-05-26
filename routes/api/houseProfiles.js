// getting houses, saving houses ect
const express = require('express');
const router = express.Router();

// this route should implement the scraper

/*
  @route   GET api/houses
  @desc    Test route
  @access  Private
*/

router.get('/', (req, res) => res.send('Houses stuff Route'));

module.exports = router;
