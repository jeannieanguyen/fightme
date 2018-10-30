import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prop_key: '',
    };
  }

  render() {
    return (
      <div id="template-page">
        <h1>Match</h1>
        {this.props.prop_key}
      </div>
    );
  }
}

Match.propTypes = {
  prop_key: PropTypes.string,
};

Match.defaultProps = {
  prop_key: '',
};

export default connect(
  mapStateToProps,
  {},
)(Match);
