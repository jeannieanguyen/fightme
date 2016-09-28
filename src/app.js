'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { setError, clearError } from './actions/index';
import s from './styles/styles.scss';

class App extends Component {

    constructor(props) {
        super(props);

        this.dismissAlert = this.dismissAlert.bind(this);
    }

    dismissAlert() {
        this.props.clearError();
    }

    componentWillReceiveProps(nextProps) {
        if(_.has(nextProps.appdata, 'error')) {
            if(_.has(nextProps.appdata.error, 'reason')) {
                switch(nextProps.appdata.error.reason) {
                    default :
                        // Handle different errors here
                    break;
                }
            }
        }
    }

    render() {
        const { children, appdata } = this.props;
        
        return (
            <div className="col-xs-12 no-pad">
                { appdata.error && <div className="app-alert alert alert-danger danger-bg" onClick={this.dismissAlert}><i className="fa fa-times"></i> {appdata.error.message}</div> }
                <div className={ appdata.error ? 'content-wrapper has-error' : 'content-wrapper'}>
                    {children}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        appdata: state.appData
    }
}

export default connect(mapStateToProps, { setError, clearError })(App);
