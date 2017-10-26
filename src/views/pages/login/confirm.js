import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { get } from 'lodash';
import { authActions, authSelectors } from 'ducks/auth';

const { confirmUserEmail } = authActions;

export class ConfirmPage extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.location.query);
    this.onConfirmUserEmail = this.onConfirmUserEmail.bind(this);
    this.updateField = this.updateField.bind(this);
    console.log(this.props.location.query);
  }

  onConfirmUserEmail() {
    // talk to cognito
    this.props.confirmUserEmail(this.state);
  }

  componentWillMount() {
      this.setState({
        email: decodeURI(get(this.props.location.query, 'email')),
        code: get(this.props.location.query, 'code')
      });
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
        <div>
          <h1>EMAIL CONFIRMING!</h1>
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
      </div>
    );
  }
}

ConfirmPage.propTypes = {
  confirmUserEmail: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    email_verified: PropTypes.string,
    sub: PropTypes.string,
  }),
};

ConfirmPage.defaultProps = {
  user: {
    email: '',
    code: ''
  },
};

function mapStateToProps(state) {
  return {
    confirmUserEmail: authSelectors.getRegisteredUser(state)
  }
}

@connect(mapStateToProps, { confirmUserEmail })
export default class ConfirmPageContainer extends Component {
  render() {
    return <ConfirmPage {...this.props} />;
  }
}
