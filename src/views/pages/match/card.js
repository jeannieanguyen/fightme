import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="avatar" />
        <span className="name">Name</span>
      </div>
    );
  }
}

// Card.propTypes = {
//   fighter: PropTypes.string,
// };

// Card.defaultProps = {
//   fighter: '',
// };

export default connect(
  mapStateToProps,
  {},
)(Card);
