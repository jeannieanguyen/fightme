import React, { Component } from 'react';

class LoginPage extends Component {
	onLoginClick() {
		console.log('clicked');
	}
	render(){

		return (
			<div>
				<h1>Please log in</h1>
				<label htmlFor="email_field">E-mail</label>
				<input type="text" name="email_field" placeholder="E-mail address"/>
				<br />
				<label htmlFor="password">Password</label>
				<input type="text" name="password" placeholder="Password"/>
				<br />
				<button onClick={ ::this.onLoginClick }> Log In</button>
			</div>
		);
	}
}

export default LoginPage;
