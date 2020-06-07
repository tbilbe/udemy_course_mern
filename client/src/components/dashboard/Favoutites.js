import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import moment from 'moment'
import { deletePropertiesFromFavorites } from '../../actions/profile';

const Favorites = ({ favorite, deletePropertiesFromFavorites }) => {


  const favorites = favorite.map(favHouse => (
    <div className="container card" key={favHouse.id}>
      <h3>{favHouse.title}</h3>
      <h4>{favHouse.price}</h4>
      <h4>{favHouse.returnOnInvestment}</h4>
      
    </div>
  ))
  return (
    <Fragment>
      {favorites}
    </Fragment>
  )
}

Favorites.propTypes = {
  favorite:PropTypes.array.isRequired,
  deletePropertiesFromFavorites: PropTypes.func.isRequired,
}

export default connect(null, { deletePropertiesFromFavorites })(Favorites);
