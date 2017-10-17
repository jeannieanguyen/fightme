import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGeneralErrorSelector } from 'ducks/errors';
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import s from 'styles/styles.scss';
/* eslint-enable */

export default function errorHandlingDecorator() {
  return (InnerComponent) => {
    function mapStateToProps(state) {
      return {
        error: getGeneralErrorSelector(state),
      };
    }

    @connect(mapStateToProps)
    class ErrorHandlingHoc extends Component {
      render() {
        return (
          <div>
            <div>
              {this.props.error &&
                <h4 className="error-message">{this.props.error}</h4>
              }
            </div>
            <InnerComponent {...this.props} />
          </div>
        );
      }
    }

    ErrorHandlingHoc.propTypes = {
      error: PropTypes.node,
    };

    ErrorHandlingHoc.defaultProps = {
      error: null,
    };

    return ErrorHandlingHoc;
  };
}
