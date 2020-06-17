import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import search from './search'
import trendingSearches from './trendingSearches'
import houses from './houses'

export default combineReducers({
  alert, auth, profile, trendingSearches, search, houses
});