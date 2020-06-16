import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import moment from 'moment'
import { deletePropertiesFromPortfolio } from '../../actions/profile';

const PortfolioHouses = ({ portfolio, deletePropertiesFromPortfolio }) => {


  const portfolioProperties = portfolio.map(el => (
    <tr key={el.location}>
      <td>{el.title}</td>
      <td>{el.location}</td>
      <td >{el.status}</td>
      <td >{el.contractType}</td>
      <td className="hide-sm">
        <Moment format='YYYY/MM/DD'>{moment.utc(el.dateOwned)}</Moment>
      </td>
      <td>
        <button onClick={() => deletePropertiesFromPortfolio(el.id)} className="btn-sml btn-danger mobile-btn">Delete</button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Portfolio</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Property Title</th>
            <th >Location</th>
            <th >Status</th>
            <th >Contract Type</th>
            <th className="hide-sm">Date Owned</th>
            <th />
          </tr>
        </thead>
        <tbody>{portfolioProperties}</tbody>
      </table>
    </Fragment>
  )
}

PortfolioHouses.propTypes = {
  portfolio:PropTypes.array.isRequired,
  deletePropertiesFromPortfolio: PropTypes.func.isRequired,
}

export default connect(null, { deletePropertiesFromPortfolio })(PortfolioHouses);
