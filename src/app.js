import React, { Component } from 'react';
import { connect } from 'react-redux';
import { errorHandlingDecorator } from 'views/enhancers/index';
/* eslint-disable no-unused-vars */
import s from 'styles/styles.scss'; // Leaving this import for now, in case error handling HOC gets moved to not wrap app.js
/* eslint-enable */

function mapStateToProps(state) {
  return {
    ...state,
  };
}

@errorHandlingDecorator()
@connect(mapStateToProps, { })
export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="col-xs-12 no-pad">
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    );
  }
}
