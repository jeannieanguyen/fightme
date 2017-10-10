import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authActions, authSelectors } from 'ducks/auth';
import { Link } from 'react-router';

const { loginUser } = authActions;

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
      <div>
        <div>
          <h1>LOGIN USER</h1>
          <label htmlFor="email_field">E-mail</label>
          <input
            type="text"
            name="email"
            placeholder="E-mail address"
            onChange={this.updateField}
            className="email-login"
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.updateField}
            value={password}
          />
          <button onClick={this.onLogin}>Login</button>
          <button>
            <Link to="/register">REGISTER INSTEAD</Link>
          </button>
        </div>
        <div>
          {this.props.user &&
          <Link to="/hello_world">YAY LETS GO TO HELLO WORLD.</Link>
          }
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    email_verified: PropTypes.string,
    sub: PropTypes.string,
  }),
};

LoginPage.defaultProps = {
  loginUser: () => {},
  user: {
    email: '',
    email_verified: '',
    sub: '',
  },
};

function mapStateToProps(state) {
  return {
    user: authSelectors.getUser(state),
  };
}

export default connect(mapStateToProps, { loginUser })(LoginPage);
