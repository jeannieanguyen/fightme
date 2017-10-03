import React, { Component } from 'react';
import config from 'webpack-config-loader!../config.js';
import { connect } from 'react-redux';
import { templateEpics, templateSelectors } from 'ducks/template';

let { startFetchData } = templateEpics;

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props);
        this.props.startFetchData();
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
                {this.props.data.length}
            </div>
        );
    }
}

export function mapStateToProps(state){
    return {
        data: templateSelectors.getData(state)
    }
}

export default connect(mapStateToProps, { startFetchData })(HomePage);
