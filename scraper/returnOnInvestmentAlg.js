// calculate return on investment
function returnOnInvestment (initial, mortgageRate, listPriceOfProperty, potentialRent) {
  const convertInitialToNumber = parseInt(initial.replace(/[^\d.-]/g, ''), 10);
  const convertRentToNumber = parseFloat(potentialRent.replace(/[^\d.-]/g, ''));
  const listPriceAsNumber = parseFloat(listPriceOfProperty.replace(/[^\d.-]/g, ''));

  const requiredTotalInvestmentIncludingFees = (listPriceAsNumber / 4) + (listPriceAsNumber * 0.03) + (listPriceAsNumber * 0.015); // initial investment, stamp duty, fees
  
  if (convertInitialToNumber < requiredTotalInvestmentIncludingFees) {
    console.log('not enough initial capital');
  }

  const convertMortgageRateToNumber = 1 + (mortgageRate / 100)  // 3.4% 
  const allowedMortgagePotential = convertInitialToNumber * 3;
  const totalInvestmentRequiredToSecureDeal = allowedMortgagePotential + convertInitialToNumber;

  if (listPriceAsNumber > totalInvestmentRequiredToSecureDeal) {
    console.log('List price too expensive - Investment Not Viable');
  }

  const requiredInvestmentAtListPrice = listPriceAsNumber / 4;

  const moneyLeft = convertInitialToNumber - requiredInvestmentAtListPrice;

  const mortgageValue = listPriceAsNumber - requiredInvestmentAtListPrice;
  console.log('returnOnInvestment -> mortgageValue', mortgageValue)

  const mortgageRepaymentsYearly = (mortgageValue * convertMortgageRateToNumber) - mortgageValue;
  console.log('returnOnInvestment -> mortgageRepaymentsYearly', mortgageRepaymentsYearly)
  const monthlyMortgageRepayments = mortgageRepaymentsYearly / 12;
  console.log('returnOnInvestment -> monthlyMortgageRepayments', monthlyMortgageRepayments)
  const grossRentPerYear = convertRentToNumber * 12;


  const managementContingencies = 0.9 * convertRentToNumber;
  const emptyHouseOtherContingencies = 0.9;

  const netPotentialRentalIncome = Math.floor((grossRentPerYear - (monthlyMortgageRepayments + managementContingencies)) * emptyHouseOtherContingencies);

  const returnOnInitialInvestment = Math.floor((netPotentialRentalIncome / requiredTotalInvestmentIncludingFees) * 100);

  const response = {
    returnOnInvestment: `${returnOnInitialInvestment}%`,
    totalInitialInvestmentAfterFees: requiredTotalInvestmentIncludingFees,
    mortgageRepaymentsPerMonth: monthlyMortgageRepayments,
    grossProfitPerYear: grossRentPerYear,
    netProfitPerYear: netPotentialRentalIncome,
    moneyLeftInPotAfterPurchase: moneyLeft
  }
  return response;
}

module.exports = {
  returnOnInvestment
}