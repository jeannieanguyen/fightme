import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'ducks/auth';
import { Link } from 'react-router';

let { registerUser } = authActions;

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.updateField = this.updateField.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

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
	onRegister(){
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
						onChange={this.updateField}
						value={email}/>
					<label htmlFor="password">Password</label>
					<input type="password"
						name="password"
						placeholder="Password"
						onChange={this.updateField}
						value={password}/>
					<button onClick={this.onRegister}>Register</button>
					<button><Link to="/login">LOGIN</Link></button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { registerUser })(RegisterPage);
