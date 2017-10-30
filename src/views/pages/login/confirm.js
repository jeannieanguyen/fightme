import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import * as AuthDuck from 'ducks/auth';
import PropTypes from 'views/propTypes';

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
          <button className="confirm-btn" onClick={this.onConfirmUserEmail}>
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

ConfirmPage.propTypes = {
  confirmUserEmail: PropTypes.func.isRequired,
  location: PropTypes.location,
};

ConfirmPage.defaultProps = {
  email: '',
  code: '',
  location: {
    query: {},
  },
};

function mapStateToProps(state) {
  return {
    confirmed: AuthDuck.selectors.getUserEmailConfirmed(state),
  };
}

export default connect(mapStateToProps, { confirmUserEmail })(ConfirmPage);
