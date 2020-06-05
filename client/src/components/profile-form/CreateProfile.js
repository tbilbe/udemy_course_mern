import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, getCurrentProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  }

  return (
    <Fragment>
      `<h1 className="large text-primary">
        Create Your Profile
        </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some basic information for your profile
        </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Select Status</option>
            <option value="Developer">Developer</option>
            <option value="Land-lord">Private landlord</option>
            <option value="Investor">Investor</option>
            <option value="Deal Sourcer">Deal sourcer</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of what you are interested in
            </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
          <small className="form-text">
            Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" onChange={e => onChange(e)} value={website} />
          <small className="form-text"
          >Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" onChange={e => onChange(e)} value={location} />
          <small className="form-text"
          >City & County suggested (eg. Manchester, Lancs)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" onChange={e => onChange(e)} value={skills} />
          <small className="form-text"
          >Please use comma separated values (eg.
              Buy-to-let,Lease-option-agreements,Rent-rent)</small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio about yourself or company" name="bio" onChange={e => onChange(e)} value={bio}></textarea>
          <small className="form-text">Tell us a little about your company or yourself</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn-med btn-light">
            Add Social Network Links
            </button>
          <span>Optional</span>
        </div>

        {
          displaySocialInputs && (<Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter" onChange={e => onChange(e)} value={twitter} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" onChange={e => onChange(e)} value={facebook} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" onChange={e => onChange(e)} value={youtube} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="Linkedin URL" name="linkedin" onChange={e => onChange(e)} value={linkedin} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" onChange={e => onChange(e)} value={instagram} />
            </div>
          </Fragment>
          )}
        <input type="submit" className="btn-med btn-primary my-1" />
        <Link className="btn-med btn-light my-1" to="/dashboard">
          Go Back
          </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
