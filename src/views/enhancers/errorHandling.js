import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGeneralErrorSelector } from 'ducks/errors';
import s from 'styles/styles.scss';

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

    return ErrorHandlingHoc;
  };
}
