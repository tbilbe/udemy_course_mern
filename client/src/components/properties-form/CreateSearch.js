import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { addPropertiesToPortfolio } from '../../actions/search';



const CreateSearch = ({ addPropertiesToPortfolio, history }) => {

  const [formData, setFormData] = useState({
    searchTerm: '',
    maxprice: '',
  });

  const { 
    searchTerm,
    maxprice
  } = formData;
 
  const onSubmit = e => {
    e.preventDefault();
    addPropertiesToPortfolio(formData, history);
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1>You hit the search endpoint!</h1>
      <h3>TODOS: add search form and button!</h3>
      <h4>Add spinner</h4>
      <h4>Add component did mount and add house cards.</h4>
      <h4>Create house cards!</h4>
      <Fragment className="container container-border">
        <h1 className="m-1 large container container-border text-center">Create Property Search Form</h1>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter the first of a UK postcode"
              name="searchTerm"
              value={searchTerm}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              Could be your own company or one you work for</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter maximum capital to invest in property"
              name="maxprice"
              value={maxprice}
              onChange={e => onChange(e)}
            />
            <small className="form-text"
            >Could be your own or a company website</small>
          </div>
          <input type="submit" className="btn-med btn-primary my-1" />
          <Link className="btn-med btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    </Fragment>
  )
}

CreateSearch.propTypes = {
  addPropertiesToPortfolio: PropTypes.func.isRequired,

}

export default connect(null, {addPropertiesToPortfolio})(withRouter(CreateSearch));
