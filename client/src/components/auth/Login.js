import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		console.log('Success');
	};

	return (
		<div>
			<h1 className="large text-primary">Sign in</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign into your account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => onChange(e)}
						minLength="12"
						required
					/>
				</div>

				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don\'t have an account?
				<Link to="/register"> Sign up</Link>
			</p>
		</div>
	);
};
export default Login;
