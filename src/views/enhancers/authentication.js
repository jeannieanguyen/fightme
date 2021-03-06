import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import * as AuthDuck from 'ducks/auth';

export function withAuthentication(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      userTokens: AuthDuck.selectors.getUserTokenObject(state),
    };
  }

  @connect(mapStateToProps)
  class AuthenticatedComponent extends Component {
    componentWillMount() {
      const { userTokens } = this.props;
      if (isEmpty(userTokens)) {
        browserHistory.push('/login');
      }
    }
    render() {
      return <WrappedComponent />;
    }
  }

  AuthenticatedComponent.propTypes = {
    userTokens: PropTypes.shape({
      accessToken: PropTypes.string,
      idToken: PropTypes.string,
      refreshToken: PropTypes.string,
    }),
  };

  AuthenticatedComponent.defaultProps = {
    userTokens: null,
  };

  return AuthenticatedComponent;
}

export default withAuthentication;
