import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authSelectors, authActions } from 'ducks/auth';
import PropTypes from 'prop-types';

const { getSampleService } = authActions;

class HelloWorldPage extends Component {
  componentWillMount() {
    this.props.getSampleService();
  }
  displaySampleData() {
    const { sample } = this.props;
    if (this.props.sample) {
      return (
        <div>
          <div className="details">
            { JSON.stringify(sample)}
          </div>
        </div>
      );
    }
    return null;
  }
  render() {
    return (
      <div className="hello-world-container">
        <div>
          <img
            src="https://img07.deviantart.net/0a7b/i/2016/174/2/9/free_2_use_left_shark_by_syrcaid-da7dd49.png"
            alt="Sad Shark"
          />
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

  sample: PropTypes.shape({
    statusCode: PropTypes.number,
    greeting: PropTypes.string,
  }),
  getSampleService: PropTypes.func.isRequired,
};

HelloWorldPage.defaultProps = {
  sample: {},
};

function mapStateToProps(state) {
  return {
    sample: authSelectors.getSample(state),
  };
}

export default connect(mapStateToProps, { getSampleService })(HelloWorldPage);
