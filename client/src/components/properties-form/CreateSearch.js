import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { searchForPropertyDeals } from '../../actions/search';


const CreateSearch = ({ searchForPropertyDeals, history, houses: { scrapeRes} }) => {

  console.log('what is scrape res', scrapeRes);

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
    searchForPropertyDeals(formData, history);
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  

  return (
    <Fragment>
      <h1>You hit the search endpoint!</h1>
      <h3>TODOS: add search form and button!</h3>
      <h4>Add spinner</h4>
      <h4>Add component did mount and add house cards.</h4>
      <h4>Create house cards!</h4>

      <div className="container container-border">
        <h1 className="m-1 large container container-border text-center">Create Property Search Form</h1>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter a UK postcode: for example LS6 or HU5"
              name="searchTerm"
              value={searchTerm}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              To start a search we only need the first half of a UK postcode</small>
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
            >If you have £20'000 to invest just use this value - we'll do the rest</small>
          </div>
          <input type="submit" className="btn-med btn-primary my-1" />
          <Link className="btn-med btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </div>
      <br/>
      <hr/>
      <br/>
      {scrapeRes && scrapeRes.map((deal) => (
        <p key={deal.houseLink}>{deal}</p>
      ))}

    </Fragment>
  )
}

CreateSearch.propTypes = {
  searchForPropertyDeals: PropTypes.func.isRequired,
  houses: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  houses: state.search.properties,
  profile: state.profile
})

export default connect(mapStateToProps, {searchForPropertyDeals})(withRouter(CreateSearch));
