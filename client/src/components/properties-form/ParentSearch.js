import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CreateSearch from './CreateSearch';
import FoundHouseCard from './FoundHouseCard';


class ParentSearch extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      propertyInfo = []
    }
  
  }
  
  

  onSearchFormSubmit = e => {
    e.preventDefault();
    searchForPropertyDeals(formData, history);
  };

  render() {
    return (
      <Fragment>
        <CreateSearch onSubmit={this.onSearchFormSubmit}/>
        {houses && <FoundHouseCard houses={} />}
      </Fragment>
    )
  }
  
}

export default ParentSearch
