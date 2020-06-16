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

  if (!trendingMapped) {
    return (
      <h3 className="lead">It's been a slow search day!</h3>
    )
  } else {
    return (
      <Fragment>
        <h2 className="m-1">Recent Trending Searches</h2>
        <p className="lead">The most recent searches across the <i>Lando</i> search engine</p>
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
  
}

Trending.propTypes = {
  trendingSearches:PropTypes.array.isRequired,
}

export default (Trending);
