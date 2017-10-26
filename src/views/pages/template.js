import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export class TemplateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prop_key: '',
    };
  }

  render() {
    return (
      <div id="template-page">
        <h1>TemplateView</h1>
        { this.props.prop_key }
      </div>
    );
  }
}

TemplateView.propTypes = {
  prop_key: PropTypes.string,
};

TemplateView.defaultProps = {
  prop_key: '',
};

export default connect(mapStateToProps, {})(TemplateView);
