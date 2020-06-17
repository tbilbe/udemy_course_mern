const mongoose = require('mongoose');

const PropertyYieldSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
  },
  returnOnInvestment: {
    type: String,
    required: true
  },
  totalGrossInvestment: {
    type: Number,
    required: true
  },
  mortgagePaymentsPerMonth: {
    type: Number,
    required: true
  },
  grossProfitPerYear: {
    type: Number,
    required: true
  },
  netProfitPerYear: {
    type: Number,
    required: true
  },
  moneyLeftInPotAfterPurchase: {
    type: Number,
    required: true
  }
});


module.exports = PropertyYield = new mongoose.model('PropertyYield', PropertyYieldSchema);

