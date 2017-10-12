import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authSelectors, authActions } from 'ducks/auth';
import PropTypes from 'prop-types';

const { getSampleService } = authActions;

function mapStateToProps(state) {
  return {
    sample: authSelectors.getSample(state),
  };
}

@connect(mapStateToProps, { getSampleService })
class HelloWorldPage extends Component {
  componentWillMount() {
    this.props.getSampleService();
  }
  displaySampleData(){
    const { sample } = this.props;
    if(this.props.sample){
      return (
        <div>
          <h2>SAMPLE DATA RETURNED : </h2>
          <h4>{ `ID : ${sample.id}` }</h4>
          <h4>{ `PRICE : ${sample.price}` }</h4>
          <h4>{ `TYPE : ${sample.type}` }</h4>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <h1>here is my home page</h1>
        {this.displaySampleData()}
      </div>
    );
  }
}

HelloWorldPage.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  sample: PropTypes.object.isRequired,
  getSampleService: PropTypes.func.isRequired,
};

HelloWorldPage.defaultProps = {
  sample: {},
};

export default HelloWorldPage;
