import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import moment from 'moment'
import { deletePropertiesFromPortfolio } from '../../actions/profile';

const Experience = ({ experience, deletePropertiesFromPortfolio }) => {


  const experiences = experience.map(exp => (
    <tr key={exp.id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
            <Moment format='YYYY/MM/DD'>{moment.utc(exp.to)}</Moment>
          )}
      </td>
      <td>
        <button onClick={() => deletePropertiesFromPortfolio(exp.id)} className="btn-sml btn-danger">Delete</button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Recent Searches</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  )
}

Experience.propTypes = {
  experience:PropTypes.array.isRequired,
  deletePropertiesFromPortfolio: PropTypes.func.isRequired,
}

export default connect(null, { deletePropertiesFromPortfolio })(Experience);
