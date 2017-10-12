import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { authSelectors } from 'ducks/auth';

export function withAuthentication(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      user: authSelectors.getUser(state),
    };
  }

  @connect(mapStateToProps)
  class AuthenticatedComponent extends Component {
    componentWillMount() {
      const { user } = this.props;
      if (!user) {
        browserHistory.push('/login');
      }
    }
    render() {
      return <WrappedComponent />;
    }
  }

  AuthenticatedComponent.propTypes = {
    user: PropTypes.object,
  };

  return AuthenticatedComponent;
}

export default withAuthentication;
