const puppeteer = require('puppeteer');

async function scrapeHouses(searchTerm, maxPrice) {
    const scrapedResponses = [];
    let Zoopla_searchTerm;
    const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3239.108 Safari/537.36';
    // const options = {
    //     headless: false,
    //     args: [
    //         `--proxy-server=${proxyIP}:${proxyPORT}`,
    //         `--ignore-certificate-errors`,
    //         `--no-sandbox`
    //     ]
    // };
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(USER_AGENT);
    const maxprice = maxPrice ? maxPrice : '';
    // const minprice = minPrice ? minPrice : ''
    /* 
    if no max price given
    */
    if (maxprice.length === 0) {
        // no max price
        Zoopla_searchTerm = `https://www.zoopla.co.uk/for-sale/property/${searchTerm}/?q=${searchTerm}&results_sort=newest_listings&search_source=for-sale`

    } else {
        console.log('using search term and max price');
        Zoopla_searchTerm = `https://www.zoopla.co.uk/for-sale/property/${searchTerm}/?price_max=${maxprice}&q=${searchTerm}&radius=0&results_sort=newest_listings&search_source=refine`
    }

    //land on zoopla
    await page.goto(Zoopla_searchTerm, { waitUntil: 'networkidle2' });

    // grab all links to houses on page
    const zooplaSearchResultsLinks = await page.evaluate((selector) => {
        const anchors_node_list = document.querySelectorAll(selector);
        const anchors = [...anchors_node_list];
        return anchors.map(link => link.href);
    }, 'div > div.listing-results-right.clearfix > a');

    // grab the pagination links
    const nextZooplaPage = await page.evaluate((selector) => {
        const nodelist = document.querySelectorAll(selector);
        const mappableList = [...nodelist];
        const nextPages = mappableList.map(link => link.href).slice(0, 10);
        return nextPages;
    }, '#content > div.paginate.bg-muted > a');

    console.log(`[#] Done getting links\n possible links: ${zooplaSearchResultsLinks.length} minus 5 = ${(zooplaSearchResultsLinks.length) - 5}`);

    // first page loop! click and grab all data in nested houses
    for (let i = 3; i < zooplaSearchResultsLinks - 3; i++) {
        let houseLink = zooplaSearchResultsLinks[i];
        console.log(`\n[#${i}] Trying: ${houseLink}`);
        await page.goto(houseLink, { waitUntil: 'networkidle2' })
        scrapedResponses.push(await scrapeHousesOnPage(page, houseLink));
    }
    
    // start pagination scrape loop
    for (let i = 0; i < nextZooplaPage.length; i++) {
        await page.goto(nextZooplaPage[i], { waitUntil: 'networkidle2' });
        scrapedResponses.push(await scrapeHousesOnPage(page, nextZooplaPage[i]));
    }
    await page.close();
    await browser.close();
    console.log("------ DONE ------");
    console.log(scrapedResponses, scrapedResponses.length);
    return scrapedResponses;
}


async function scrapeHousesOnPage(page, pageUrlLink) {
    const priceSelector = `#dp-sticky-element > article > div > p`;
    const addressSummarySelector = `#dp-sticky-element > article > h2`;
    const houseSummary = `#dp-sticky-element > article > h1`;
    const fullDescriptionSelector = `#dp-description-collapse > div`;
    const rentalDescription = `#market-stats-tab > div.dp-market-stats.dp-market-stats--border-top > p`;
    const averageRentalFigure = `#market-stats-tab > div.dp-market-stats.dp-market-stats--border-top > span`;
    // const dateUploadSelector = ``;
    const imageUrlSelector = `#main-content > div.ui-layout > div.dp-grid-wrapper > div.dp-gallery-wrapper > div > div > ul > li:nth-child(2) > a > img`;
    const imageUrlSelector2 = `#main-content > div.ui-layout > div.dp-grid-wrapper > div.dp-gallery-wrapper > div > div > ul > li:nth-child(3) > a > img`;
    const imageUrlSelector3 = `#main-content > div.ui-layout > div.dp-grid-wrapper > div.dp-gallery-wrapper > div > div > ul > li:nth-child(4) > a > img`;

    const price = await page.evaluate((selector) => {
        const price_dom = document.querySelector(selector);
        if (price_dom) {
            return price_dom.textContent.trim();
        } else {
            return 'No content'
        }
    }, priceSelector);

    const addressSummary = await page.evaluate((selector) => {
        const address_dom = document.querySelector(selector);
        if (address_dom) {
            return address_dom.textContent.trim();
        } else {
            return 'No content'
        }
    }, addressSummarySelector);

    const houseSum = await page.evaluate(selector => {
        const house_dom = document.querySelector(selector);
        if (house_dom) {
            return house_dom.textContent.trim();
        } else {
            return 'No content'
        }
    }, houseSummary);

    const rentalOps = await page.evaluate(selector => {
        const rentOps_dom = document.querySelector(selector);
        if (rentOps_dom) {
            return rentOps_dom.textContent.trim();
        } else {
            return 'No content';
        }
    }, rentalDescription);

    const fullDescription = await page.evaluate(selector => {
        const fullDescription_dom = document.querySelector(selector);
        if (fullDescription_dom) {
            return fullDescription_dom.textContent.trim();
        } else {
            return 'No content';
        }
    }, fullDescriptionSelector);


    const aveRent = await page.evaluate(selector => {
        const rentFigure_dom = document.querySelector(selector);
        if (rentFigure_dom) {
            return rentFigure_dom.textContent.trim();
        } else {
            return 'No content';
        }
    }, averageRentalFigure);


    const image = await page.evaluate((selector, s2, s3) => {
        const imageUrl_dom = document.querySelector(selector);
        const imageUrl_dom2 = document.querySelector(s2);
        const imageUrl_dom3 = document.querySelector(s3);
        if (imageUrl_dom && imageUrl_dom.src) {
            return imageUrl_dom.src;
        } else if (imageUrl_dom2 && imageUrl_dom2.src) {
            return imageUrl_dom.src;
        } else if (imageUrl_dom3 && imageUrl_dom3.src) {
            return imageUrl_dom3.src
        } else {
            return 'No img content';
        }
    }, imageUrlSelector, imageUrlSelector2, imageUrlSelector3);

    const listingResponse = {
        pageUrlLink,
        houseSum,
        price,
        addressSummary,
        rentalOps,
        aveRent,
        fullDescription,
        image
    }
    // scrapedResponses.push(listingResponse)
    return listingResponse;


}
// scrapeHouses('m4', '150000');
scrapeHouses('hu10');

module.exports = {
    scrapeHouses
}
