const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Search = require('../../models/PropertySearch');
const auth = require('../../middleware/auth');
const House = require('../../models/House');

const scrapers = require('../../scraper/scrapers');
const returnOnInvestment = require('../../scraper/returnOnInvestmentAlg');

/*
@route   GET api/houses/search/trendingSearches
@desc    This route should return the 5 top ranks search areas
@access  Private
*/
router.get('/search/trendingsearches' ,async (req, res) => {
    // trending one day
    let ONE_DAY = 24 * 60 * 60 * 1000; // ms
    const oneDayOldSearch = new Date(Date.now() - ONE_DAY); //  
    
    const searches = await Search.find({});
    console.log('searches', searches.length);
    if (searches) {
      console.log('oneDayOldSearch', oneDayOldSearch)
      
      const youngSearches = searches.filter(search =>{ return new Date(`${search.date}`) > oneDayOldSearch });
      const rankedSearches = [...youngSearches.reduce( (acc, next) => {
        if (!acc.has(next.searchTerm)) acc.set(next.searchTerm, { ...next, count: 0 });
        acc.get(next.searchTerm).count++;
        return acc;
      }, new Map).values()];
    const rankedTrendingSearches = rankedSearches.sort((a,b) => b.count - a.count).splice(0,5);
    console.log('rankedTrendingSearches', rankedTrendingSearches)
    const converted = rankedTrendingSearches.map(el => {
      return {
        searchTerm: el._doc.searchTerm,
        maxprice: el._doc.maxprice,
        date: el._doc.date,
        count: el.count
      }});
      // console.log(converted);
    return res.json(converted);
    }

});



// this route should implement the scraper
/*
  @route   POST api/houses/search/customsearch
  @desc    Test route
  @access  Private
*/

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
    // let search = await Search.findOne({searchTerm, maxprice});
    // console.log('search', search)
    
    // if (search) {
    //   await search.save();
    //   // the return value should be an array of the scraper doing a previous search
    //   const previousSearches = await House.find().populate('search').exec((err,prevSearches) => {
    //     if (err) res.status(500).send('Server Error!');
    //   })
    //   console.log('previousSearches', previousSearches)
    //   return res.status(301).json({previousSearches})
    // } else {
      propertySearch = new Search({searchTerm: searchTerm, maxprice: maxprice});
      await propertySearch.save();
      const scrapeRes = await scrapers.scrapeHouses(searchTerm, maxprice);
      // run through the scrape results and make array of houses that make yield -> throw out ones that 🚯 
      const calculatedReturnOnInvestment = scrapeRes.map(house => returnOnInvestment.returnOnInvestment(maxprice, 3.4, house.price, house.aveRent)); // Array of all returned 🏘 
      console.log(calculatedReturnOnInvestment);

      const moreThanABakersDozen = calculatedReturnOnInvestment.filter(house => ((parseInt(house.returnOnInvestment, 10) < 20) && (parseInt(house.returnOnInvestment, 10) > 13)));
      console.log('More than a bakers dozen less than 18', moreThanABakersDozen);
      const massiveReturns = calculatedReturnOnInvestment.filter(house => parseInt(house.returnOnInvestment, 10) > 20);
      console.log('massiveReturns is more than 20 percent', massiveReturns)
      


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
    // }
  } catch (err) {
    console.log(`hit the error block in the trycatch`);
    console.error(err.message);
    res.status(500).send('server error!');
  }
})



module.exports = router;
