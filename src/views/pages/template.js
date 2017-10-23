import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    ...state
  };
}

export class TemplateView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="template-page">
        <h1>TemplateView</h1>
      </div>
    );
  }
}

TemplateView.propTypes = {
};

TemplateView.defaultProps = {
};

export default connect(mapStateToProps, {})(TemplateView);


