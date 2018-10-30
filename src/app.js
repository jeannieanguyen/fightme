import React, { Component } from 'react';
import { connect } from 'react-redux';
import { errorHandlingDecorator } from 'views/enhancers/index';
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import s from 'styles/styles.scss'; // Leaving this import for now, in case error handling HOC gets moved to not wrap app.js
/* eslint-enable */

function mapStateToProps(state) {
  return {
    ...state,
  };
}

@errorHandlingDecorator()
@connect(
  mapStateToProps,
  {},
)
export default class App extends Component {
  render() {
    const { children } = this.props;
    return <div className="content-wrapper">{children}</div>;
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};
