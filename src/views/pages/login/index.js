import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { authActions } from 'ducks/auth'; 

let { registerUser } = authActions;

class LoginPage extends Component {
	componentWillMount(){
		this.setState({
			email: '', 
			password: ''
		})
	}
	updateField(e){
		this.setState({
			[e.target.name] : e.target.value
		});
	}
	onLogin(){
		//this.props.loginUser(this.state);
	}
	onRegister(){
		console.log('registering again');
		this.props.registerUser(this.state);
	}
	render(){
		let { email, password } = this.state;
		return (
			<div>
				<div>
					<h1>REGISTER USER</h1>
					<label htmlFor="email_field">E-mail</label>
					<input type="text" 
						name="email" 
						placeholder="E-mail address"
						onChange={::this.updateField}
						value={email}/>
					<label htmlFor="password">Password</label>
					<input type="password" 
						name="password" 
						placeholder="Password"
						onChange={::this.updateField}
						value={password}/>
					<button onClick={ ::this.onRegister }>Register</button>
				</div>
				<div>
					<h1>LOGIN USER</h1>
					<label htmlFor="email_field">E-mail</label>
					<input type="text" 
						name="email" 
						placeholder="E-mail address"
						onChange={::this.updateField}
						value={email}/>
					<label htmlFor="password">Password</label>
					<input type="password" 
						name="password" 
						placeholder="Password"
						onChange={::this.updateField}
						value={password}/>
					<button onClick={ ::this.onLogin }>Register</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {}; 
}

export default connect(mapStateToProps, {registerUser})(LoginPage);
