import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authSelectors, authActions } from 'ducks/auth';

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
          <div className="details">
            <h4>{ `ID : ${sample.id}` }</h4>
            <h4>{ `PRICE : ${sample.price}` }</h4>
            <h4>{ `TYPE : ${sample.type}` }</h4>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="hello-world-container">
        <div>
          <img src='https://img07.deviantart.net/0a7b/i/2016/174/2/9/free_2_use_left_shark_by_syrcaid-da7dd49.png' />
          <div className="inline">
            <h1>Hello World</h1>
            <h2>Here is your sample data. </h2>
          </div>
        </div>
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
