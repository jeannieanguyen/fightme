import React, { Component } from 'react';
import config from 'webpack-config-loader!../config.js';
import { connect } from 'react-redux';
import { setError, clearError } from '../actions/index';
import { templateOperations, templateSelectors } from 'ducks/template';

let { fetchData, incrementCounter } = templateOperations;

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { setError, clearError } = this.props;
        this.props.fetchData();
        this.props.incrementCounter(2);
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
                {this.props.data}
            </div>
        );
    }
}

export function mapStateToProps(state){
    return {
        data: templateSelectors.getData(state)
    }
}

export default connect(mapStateToProps, { setError, clearError, fetchData, incrementCounter })(HomePage);
