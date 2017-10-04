import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LoginPage from 'views/pages/login';
import { authSelectors } from 'ducks/auth';

export function withAuthentication ( WrappedComponent) {
	class AuthenticatedComponent extends Component {
		componentWillMount() {
			let { user } = this.props;
			if (!user) {
				browserHistory.push('/login');
			}
		}
		render () {
			return <WrappedComponent />;
		}
	}

	function mapStateToProps (state) {
		return {
			user: authSelectors.getUser(state)
		}
	}

	return connect ( mapStateToProps )(AuthenticatedComponent);
	// return WrappedComponent;
}