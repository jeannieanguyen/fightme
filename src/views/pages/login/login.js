import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as AuthDuck from 'ducks/auth';

const { loginUser } = AuthDuck.actions;

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.updateField = this.updateField.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

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
      <div className="form-container">
        <div>
          <h1>LOGIN USER</h1>
          <label htmlFor="email_field">E-mail</label>
          <input
            type="text"
            name="email"
            className="form-input email-login"
            placeholder="E-mail address"
            onChange={this.updateField}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Password"
            onChange={this.updateField}
            value={password}
          />
          <button
            onClick={this.onLogin}
            className="login-btn"
          >
              Login
          </button>
          <button>
            <Link to="/register">GO TO REGISTER</Link>
          </button>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {
  loginUser: () => {},
};

export default connect(null, { loginUser })(LoginPage);

