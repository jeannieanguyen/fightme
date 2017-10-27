import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { get } from 'lodash';
import * as AuthDuck from 'ducks/auth';

const { confirmUserEmail } = AuthDuck.actions;

export class ConfirmPage extends Component {
  constructor(props) {
    super(props);
    this.onConfirmUserEmail = this.onConfirmUserEmail.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentWillMount() {
    this.setState({
      email: decodeURI(get(this.props.location.query, 'email')),
      code: get(this.props.location.query, 'code'),
    });
  }

  onConfirmUserEmail() {
    // talk to cognito
    this.props.confirmUserEmail(this.state);
  }

  updateField(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { email, code } = this.state;

    return (
      <div className="form-container">
        { this.props.confirmed &&
          <div>
            <h1>EMAIL CONFIRMED</h1>
            <button>
              <Link to="/login">GO LOGIN</Link>
            </button>
          </div>
        }

        { !this.props.confirmed &&
          <div>
            <h1>CONFIRM EMAIL!</h1>
            <label htmlFor="email_field">E-mail</label>
            <input
              type="text"
              name="email"
              className="form-input"
              placeholder="E-mail address"
              onChange={this.updateField}
              value={email}
            />
            <label htmlFor="password">Code</label>
            <input
              type="text"
              name="code"
              className="form-input"
              placeholder="Code"
              onChange={this.updateField}
              value={code}
            />
            <button onClick={this.onConfirmUserEmail}>Confirm</button>
          </div>
        }
      </div>
    );
  }
}

ConfirmPage.propTypes = {
  confirmUserEmail: PropTypes.func.isRequired,
  confirmed: PropTypes.boolean,
  location: PropTypes.shape({
    query: PropTypes.shape({
      email: PropTypes.string,
      code: PropTypes.string,
    }),
  }),
};

ConfirmPage.defaultProps = {
  email: '',
  code: '',
  confirmed: false,
  location: {
    query: {},
  },
};

function mapStateToProps(state) {
  return {
    confirmed: AuthDuck.selectors.getUserEmailConfirmed(state),
  };
}

@connect(mapStateToProps, { confirmUserEmail })
export default class ConfirmPageContainer extends Component {
  render() {
    return <ConfirmPage {...this.props} />;
  }
}
