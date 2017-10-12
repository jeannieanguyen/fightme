import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    ...state,
  };
}

@connect(mapStateToProps, { })
export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="col-xs-12 no-pad">
        {children}
      </div>
    );
  }
}
