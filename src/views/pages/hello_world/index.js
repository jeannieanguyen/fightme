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
  render() {
    return (
      <h1>here is my home page</h1>
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
