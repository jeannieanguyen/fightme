import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { authSelectors } from 'ducks/auth';
import { getGeneralErrorSelector } from 'ducks/errors';

export function withAuthentication ( WrappedComponent) {

  function mapStateToProps (state) {
    return {
      user: authSelectors.getUser(state),
    };
  }

  @connect( mapStateToProps )
  class AuthenticatedComponent extends Component {
    componentWillMount() {
      let { user } = this.props;
      if (!user) {
        browserHistory.push('/login');
      }
    }
    render() {
      return <WrappedComponent />;
    }
  }

  return AuthenticatedComponent;
}

export function withErrorHandling ( WrappedComponent ) {

  function mapStateToProps (state) {
    return {
      error: getGeneralErrorSelector(state)
    };
  }

  @connect( mapStateToProps )
  class ErrorHandledComponent extends Component {

    render() {
      let { error } = this.props;

      return (
        <div>
          <div>
            {this.props.error &&
              <h3>{this.props.error}</h3>
            }
          </div>
          <WrappedComponent />
        </div>
      );
    }
  }

  return ErrorHandledComponent;
}
