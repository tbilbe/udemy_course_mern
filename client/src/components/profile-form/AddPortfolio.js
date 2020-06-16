import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPropertiesToPortfolio } from '../../actions/profile';

const AddPortfolio = ({ addPropertiesToPortfolio, history}) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    size: '',
    status: '',
    contractType: '',
    dateOwned: ''
  });

  const { title, location, size, status, contractType, dateOwned } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add A Property to your portfolio</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add Properties to your developer portfolio, increase your network and strike up new deals
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addPropertiesToPortfolio(formData, history);
        }}
      >
        <div className='form-group'>
          <h4 className='text-dark '>Descriptive Title</h4>
          <input
            type='text'
            placeholder='* Property Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
        <h4 className='text-dark '>Property Location</h4>
          <input
            type='text'
            placeholder='* Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
        <h4 className='text-dark '>Property size</h4>
          <input
            type='text'
            placeholder='Number of Bedrooms'
            name='size'
            value={size}
            onChange={e => onChange(e)}
          />
        </div>
        {/* make this option select in future? */}
        <div className='form-group'>
        <h4 className='text-dark '>Status</h4>
          <input
            type='text'
            placeholder='e.g For Sale/ Tenanted / Looking for JV partner '
            name='status'
            value={status}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
        <h4 className='text-dark '>Property Contract</h4>
          <input
            type='text'
            placeholder='Buy-to-let / Lease option agreement / Rent-rent'
            name='contractType'
            value={contractType}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>Date Owned</h4>
          <input
            type='date'
            name='dateOwned'
            value={new Date(dateOwned)}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn-sml btn-primary my-1' />
        <Link className='btn-sml btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

AddPortfolio.propTypes = {
  addPropertiesToPortfolio: PropTypes.func.isRequired,
}

export default connect(null, { addPropertiesToPortfolio })(AddPortfolio);
