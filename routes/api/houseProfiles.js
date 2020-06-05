const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Search = require('../../models/PropertySearch');
const auth = require('../../middleware/auth');
const House = require('../../models/House');

const scrapers = require('../../scraper/scrapers');
// this route should implement the scraper

/*
  @route   POST api/houses/search/customsearch
  @desc    Test route
  @access  Private
*/

// router.get('/search/trendingsearches', auth ,async (req, res) => res.send('Houses stuff Route'));

router.post('/search/customsearch', [
  auth,
  check('searchTerm', 'the first half of a UK postcode is required').not().isEmpty()
], async (req, res) => {
  const { searchTerm, maxprice } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    console.log('here')
    // see if the same property search exists 
    let search = await Search.findOne({searchTerm, maxprice});
    console.log('search', search)
    
    if (search) {
      await search.save();
      // the return value should be an array of the scraper doing a previous search
      const previousSearches = await House.find().populate('search').exec((err,prevSearches) => {
        if (err) res.status(500).send('Server Error!');
      })
      console.log('previousSearches', previousSearches)
      return res.status(301).json({previousSearches})
    } else {
      propertySearch = new Search({searchTerm: searchTerm, maxprice: maxprice});
      await propertySearch.save();
      const scrapeRes = await scrapers.scrapeHouses(searchTerm, maxprice);
      await Promise.all(scrapeRes.map(async (el) => {
        try {
          const house = new House({
            listingSummary: el.houseSum,
            address: el.addressSummary,
            listPrice: el.price,
            fullDescription: el.fullDescription,
            image: el.image,
            rentalSummaryInArea: el.rentalOps,
            rentalAverageInArea: el.aveRent
          })
          await house.save();
        } catch (error) {
          console.log('inside the promise all');
          console.log(error)
        }        
      }));
      return res.status(200).json({scrapeRes});
    }
  } catch (err) {
    console.log(`hit the error block in the trycatch`);
    console.error(err.message);
    res.status(500).send('server error!');
  }



})



module.exports = router;
