import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { getGeneralErrorSelector, clearError } from 'ducks/errors';
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

    class ErrorHandlingHoc extends Component {
      constructor(props) {
        super(props);
        this.clearErrorMessage = this.clearErrorMessage.bind(this);
      }

      clearErrorMessage() {
        this.props.clearError();
      }
      render() {
        return (
          <div>
            <div>
              {this.props.error &&
                <Alert bsStyle="danger" onDismiss={this.clearErrorMessage}>{this.props.error}</Alert>
              }
            </div>
            <InnerComponent {...this.props} />
          </div>
        );
      }
    }

    ErrorHandlingHoc.propTypes = {
      error: PropTypes.node,
      clearError: PropTypes.func.isRequired,
    };

    ErrorHandlingHoc.defaultProps = {
      error: null,
    };

    return connect(mapStateToProps, { clearError })(ErrorHandlingHoc);
  };
}
