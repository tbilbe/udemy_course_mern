const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Search = require('../../models/PropertySearch');
const auth = require('../../middleware/auth');
const House = require('../../models/House');

const scrapers = require('../../scraper/scrapers');
const returnOnInvestment = require('../../scraper/returnOnInvestmentAlg');
const PropertyYield = require('../../models/PropertyYield');

/*
@route   GET api/houses/search/trendingSearches
@desc    This route should return the 5 top ranks search areas
@access  Private
*/
router.get('/search/trendingsearches', async (req, res) => {
  // trending one day
  let ONE_DAY = 24 * 60 * 60 * 1000; // ms
  const oneDayOldSearch = new Date(Date.now() - ONE_DAY); //  
  
  const searches = await Search.find({});
 
  if (searches) {
    const newestSearches = searches.filter(search => new Date(`${search.date}`) > oneDayOldSearch);
    const rankedSearches = [...newestSearches.reduce((acc, next) => {
      if (!acc.has(next.searchTerm)) acc.set(next.searchTerm, { ...next, count: 0 });
      acc.get(next.searchTerm).count++;
      return acc;
    }, new Map).values()];
    const rankedTrendingSearches = rankedSearches.sort((a, b) => b.count - a.count).splice(0, 5);

    const convertedMongoResponse = rankedTrendingSearches.map(el => {
      return {
        searchTerm: el._doc.searchTerm,
        maxprice: el._doc.maxprice,
        date: el._doc.date,
        count: el.count
      }
    });
    return res.json(convertedMongoResponse);
  }

});

// this route should implement the scraper
/*
  @route   POST api/houses/search/customsearch
  @desc    Start scraper to pull data
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
    // see if the same property search exists 
    // let search = await Search.findOne({searchTerm, maxprice});

    // if (search) {
    //   await search.save();
    //   // the return value should be an array of the scraper doing a previous search
    //   const previousSearches = await House.find().populate('search').exec((err,prevSearches) => {
    //     if (err) res.status(500).send('Server Error!');
    //   })
    //   console.log('previousSearches', previousSearches)
    //   return res.status(301).json({previousSearches})
    // } else {
    const propertySearch = new Search({ searchTerm: searchTerm, maxprice: maxprice });
    await propertySearch.save();
    console.log('got here')

    const scrapeRes = await scrapers.scrapeHouses(searchTerm, maxprice);

    // Array of all houses with ROI calculated
    const calculatedReturnOnInvestment = scrapeRes.map(house => {
      return {
        ...house,
        returnOnInvestmentStats: returnOnInvestment.returnOnInvestment(maxprice, 3.4, house.price, house.aveRent)
      }
    });

    const moreThanABakersDozen = calculatedReturnOnInvestment
      .filter(house => ((parseInt(house.returnOnInvestmentStats.returnOnInvestment, 10) < 20) && (parseInt(house.returnOnInvestmentStats.returnOnInvestment, 10) > 13)));
    console.log('More than a bakers dozen less than 18', moreThanABakersDozen);
    const massiveReturns = calculatedReturnOnInvestment.filter(house => parseInt(house.returnOnInvestmentStats.returnOnInvestment, 10) > 20);
    console.log('massiveReturns is more than 20 percent', massiveReturns)

    // TODO Add the houses to the Property Yield model
    await Promise.all(moreThanABakersDozen.map(async (el) => {
      try {
        const yield = new PropertyYield({
          returnOnInvestment: el.returnOnInvestmentStats.returnOnInvestment,
          totalGrossInvestment: el.returnOnInvestmentStats.totalInitialInvestmentAfterFees,
          mortgagePaymentsPerMonth: el.returnOnInvestmentStats.mortgageRepaymentsPerMonth,
          grossProfitPerYear: el.returnOnInvestmentStats.grossProfitPerYear,
          netProfitPerYear: el.returnOnInvestmentStats.netProfitPerYear,
          moneyLeftInPotAfterPurchase: el.returnOnInvestmentStats.moneyLeftInPotAfterPurchase
        });
        const house = new House({
          investmentReturn: yield,
          numberOfBeds: el.beds,
          listingSummary: el.houseSum,
          address: el.addressSummary,
          listPrice: el.price,
          fullDescription: el.fullDescription,
          image: el.image,
          rentalSummaryInArea: el.rentalOps,
          rentalAverageInArea: el.aveRent,
          houseUrl: el.houseLink
        })
        await yield.save();
        await house.save();
        console.log(`got here with ${el.price} in the bakers doz`)

      } catch (err) {
        console.log('inside the promise all for the bakers doz');
        console.log(err)
      }
    }));

    await Promise.all(massiveReturns.map(async (el) => {
      try {
        const yield = new PropertyYield({
          returnOnInvestment: el.returnOnInvestmentStats.returnOnInvestment,
          totalGrossInvestment: el.returnOnInvestmentStats.totalInitialInvestmentAfterFees,
          mortgagePaymentsPerMonth: el.returnOnInvestmentStats.mortgageRepaymentsPerMonth,
          grossProfitPerYear: el.returnOnInvestmentStats.grossProfitPerYear,
          netProfitPerYear: el.returnOnInvestmentStats.netProfitPerYear,
          moneyLeftInPotAfterPurchase: el.returnOnInvestmentStats.moneyLeftInPotAfterPurchase
        });
        const house = new House({
          investmentReturn: yield,
          numberOfBeds: el.beds,
          listingSummary: el.houseSum,
          address: el.addressSummary,
          listPrice: el.price,
          fullDescription: el.fullDescription,
          image: el.image,
          rentalSummaryInArea: el.rentalOps,
          rentalAverageInArea: el.aveRent,
          houseUrl: el.houseLink
        })
        await yield.save();
        await house.save();
        console.log(`got here with ${el.price} in the massive returns`);
      } catch (err) {
        console.log('inside the promise all for the massiveReturns');
        console.log(err)
      }
    }));


    /*
     map all results into DB for now: could get some metrics from the data
    */
    await Promise.all(scrapeRes.map(async (el) => {
      try {
        const house = new House({
          numberOfBeds: el.beds,
          listingSummary: el.houseSum,
          address: el.addressSummary,
          listPrice: el.price,
          fullDescription: el.fullDescription,
          image: el.image,
          rentalSummaryInArea: el.rentalOps,
          rentalAverageInArea: el.aveRent,
          houseUrl: el.houseLink
        })
        await house.save();
      } catch (error) {
        console.log('inside the promise all');
        console.log(error)
      }
    }));
    return res.status(200).json({ scrapeRes });
    // }
  } catch (err) {
    console.log(`hit the error block in the try catch why`);
    console.error(err.message);
    res.status(500).send('server error!');
  }
})


/*
  @route   GET api/houses/
  @desc    get all houses 
  @access  Private
*/

router.get('/', () => {
  const allHouses = await House.find({});

  if(allHouses) {
    res.json(allHouses)
  } else {
			return res.status(400).send({ msg: 'Houses not found' });
  }
});

/*
  @route   GET api/houses/
  @desc    get all houses 
  @access  Private
*/

router.get('/', () => {
  const allHouses = await House.find({});

  if(allHouses) {
    res.json(allHouses)
  } else {
			return res.status(400).send({ msg: 'Houses not found' });
  }
});





module.exports = router;
