
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    // appdata: state
  };
}

@connect(mapStateToProps, { })
export default class App extends Component {
  constructor(props) {
    super(props);

    this.dismissAlert = this.dismissAlert.bind(this);
  }

  dismissAlert() {
    this.props.clearError();
  }

  componentWillReceiveProps(nextProps) {
    // if(_.has(nextProps.appdata, 'error')) {
    //     if(_.has(nextProps.appdata.error, 'reason')) {
    //         switch(nextProps.appdata.error.reason) {
    //             default :
    //                 // Handle different errors here
    //             break;
    //         }
    //     }
    // }
  }

  render() {
    const { children } = this.props;
    console.log(this.props);

    return (
      <div className="col-xs-12 no-pad">
        {/* { appdata.error && <div className="app-alert alert alert-danger danger-bg" onClick={this.dismissAlert}><i className="fa fa-times"></i> {appdata.error.message}</div> }
                <div className={ appdata.error ? 'content-wrapper has-error' : 'content-wrapper'}> */}
        {children}
        {/* </div> */}
      </div>
    );
  }
}
