import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import { getCurrentProfile } from '../../actions/profile';
import { getTrendingSearchHistory } from '../../actions/trendingSearches';
import { Link, Redirect } from 'react-router-dom';
import Experience from './Experience';
import Trending from './Tranding';
import DashboardActions from './DashboardActions';

const dummyExperience = [
  {
    id: 1,
    title: 'Best in the world',
    to: new Date(),
    from: new Date() - 10000,
    company: 'Big Bad Company'
  },
  {
    id: 2,
    title: 'smallest in the world',
    to: new Date() - 10000,
    from: new Date() - 20000,
    company: 'small good Company'
  }
]

const dummyTrends = [
  {
    searchTerm: "hu5",
    maxprice: "100000",
    date: "2020-06-07T15:32:34.209Z",
    count: 10
},{    
    searchTerm: "m26",
    maxprice: "50000",
    date: "2020-06-07T15:19:31.022Z",
    count: 5
},
{
    searchTerm: "ls6",
    maxprice: "100000",
    date: "2020-06-07T15:53:23.741Z",
    count: 2
},
{
    searchTerm: "hu7",
    maxprice: "100000",
    date: "2020-06-07T15:54:09.840Z",
    count: 2
},
{
    searchTerm: "M2",
    maxprice: "30000",
    date: "2020-06-06T20:01:48.029Z",
    count: 1
}
]


const Dashboard = ({ getCurrentProfile, getTrendingSearchHistory, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
    getTrendingSearchHistory();
  }, [getCurrentProfile, getTrendingSearchHistory]);
  return loading && profile === null ? ( <Spinner /> ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        {' '}Welcome {user && user.name.split(' ')[0]}
      </p>

    {/* profile is set to undefined as an error comes back as no profile exists */}
{profile !== null ? ( <Fragment>
  <DashboardActions />
  <Trending trendingSearches={dummyTrends}/>
  <Experience experience={profile.portfolio} /> 
  {/* experience is the proptype array -> so i want proptype of fave searches saved down as an array and pass that in to make links to searches of new areas for example */}
  </Fragment> ) : (
      <Fragment>
        <p>You don't have a profile, please add some information to your profile</p>
        <Link to='/create-profile' className='btn-med btn-primary my-1'>
          Create Profile
        </Link>
      </Fragment>
      )}
  </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getTrendingSearchHistory: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, getTrendingSearchHistory })(Dashboard);
