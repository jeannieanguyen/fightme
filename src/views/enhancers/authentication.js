import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { authSelectors } from 'ducks/auth';

export default function withAuthentication(WrappedComponent) {
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
      return <WrappedComponent {...this.props} />;
    }
  }

  return AuthenticatedComponent;
}