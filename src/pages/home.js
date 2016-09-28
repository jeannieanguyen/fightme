import React, { Component } from 'react';
import config from 'webpack-config-loader!../config.js';
import { connect } from 'react-redux';
import { setError, clearError } from '../actions/index';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { setError, clearError } = this.props;
        // clearError();
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    componentWillUpdate() {
        
    }

    componentDidUpdate() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div className="page" id="home">
                <h1><i className="fa fa-home"></i> VRC Component Boilerplate</h1>
            </div>
        );
    }
}

export default connect(null, { setError, clearError })(HomePage);
