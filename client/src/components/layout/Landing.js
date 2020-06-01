import React from 'react';
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

export const Landing = ({ isAuthenticated }) => {

	if( isAuthenticated) {
		return <Redirect to='/dashboard' />
	}
	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Search Property Investment Opportunities</h1>
					<p className="lead">
						Create a real estate developer profile/portfolio, search rental
						opportunities and get help from experienced property developers
					</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary">
							Sign Up
						</Link>
						<Link to="/login" className="btn btn-light">
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
