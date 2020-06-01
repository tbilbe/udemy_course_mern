import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Link, Redirect } from 'react-router-dom';


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? <Spinner /> : <Fragment><h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user"></i>
{' '}Welcome {user && user.name.split(' ')[0]}
    </p>

    {/* profile is set to undefined as an error comes back as no profile exists */}
{profile !== undefined ? ( <Fragment>here</Fragment> ) : (
      <Fragment>
        <p>You don't have a profile, please add some information to your profile</p>
        <Link to='/create-profile' className='btn-med btn-primary my-1'>
          Create Profile
        </Link>
      </Fragment>
      )}
  </Fragment>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
