import React, { Component } from 'react';
import config from 'webpack-config-loader!../config.js';
import { connect } from 'react-redux';
import { templateSelectors, templateActions } from 'ducks/template';
import { login, register, getVictoriousUser } from 'api/aws';
import { errorHandlingDecorator } from 'views/enhancers/index';

const { startFetchData, incrementCounter } = templateActions;


export function mapStateToProps(state) {
  return {
    data: templateSelectors.getData(state),
    count: templateSelectors.getCounter(state),
  };
}

@connect(mapStateToProps, { startFetchData, incrementCounter })
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.onCounterButtonClick = this.onCounterButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.startFetchData();
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

  onCounterButtonClick() {
    this.props.incrementCounter(2);
  }

  render() {
    return (
      <div className="page" id="home">
        <h1><i className="fa fa-home" /> VRC Component Boilerplate</h1>
        <h3>
          DATA LENGTH:
          {this.props.data.length}
        </h3>
        <button onClick={this.onCounterButtonClick}>SPAM ME</button>
        <h3>
          COUNT : {this.props.count}
        </h3>
      </div>
    );
  }
}

export default HomePage;
