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
      <Link to='/add-portfolio' className='btn-sml btn-light'>
        <i className='far fa-clipboard text-primary' /> Add Properties
      </Link>
    </div>
  )
}

export default DashboardActions;