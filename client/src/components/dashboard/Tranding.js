import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import moment from 'moment'

const Trending = ({ trendingSearches }) => {


  const trendingMapped = trendingSearches.map(search => (
    <tr key={search.id}>
      <td>{search.count}</td>
      <td>{search.searchTerm}</td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Recent Trending Searches</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Searches in the Last day</th>
            <th>PostCode Location</th>
          </tr>
        </thead>
        <tbody>{trendingMapped}</tbody>
      </table>
    </Fragment>
  )
}

Trending.propTypes = {
  trendingSearches:PropTypes.array.isRequired,
  deletePropertiesFromPortfolio: PropTypes.func.isRequired,
}

export default (Trending);
