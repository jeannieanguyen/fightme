import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { authActions } from 'ducks/auth'; 

const { loginUser } = authActions;

export class LoginPage extends Component {
  componentWillMount() {
    this.setState({
      email: '',
      password: '',
    });
  }
  onLogin() {
    this.props.loginUser(this.state);
  }
  updateField(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div>
          <h1>LOGIN USER</h1>
          <label htmlFor="email_field">E-mail</label>
          <input type="text" 
            name="email" 
            placeholder="E-mail address"
            onChange={::this.updateField}
            value={email}
            className="email-login" />
            <label htmlFor="password">Password</label>
            <input type="password" 
              name="password" 
              placeholder="Password"
              onChange={::this.updateField}
              value={password}/>
          <button onClick={() => this.onLogin()}>Login</button>
        </div>
      </div>
        );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { loginUser })(LoginPage);
