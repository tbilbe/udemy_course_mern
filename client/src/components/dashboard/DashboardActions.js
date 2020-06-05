import React from 'react'
import { Link } from 'react-router-dom'
export const DashboardActions = () => {
  return (
<div className='dash-buttons'>
      <Link to='/edit-profile' className='btn-sml btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/add-experience' className='btn-sml btn-light'>
        <i className='fab fa-black-tie text-primary' /> Add Experience
      </Link>
      <Link to='/saved-favourites' className='btn-sml btn-light'>
        <i className='fas fa-star text-primary' /> View Favourites
      </Link>
      <Link to='/add-portfolio' className='btn-sml btn-light'>
        <i className='far fa-clipboard text-primary' /> Add Properties
      </Link>
      <Link to='/search' className='btn-sml btn-light'>
        <i className='fas fa-search-location text-primary' /> Search Properties
      </Link>
    </div>
  )
}

export default DashboardActions;