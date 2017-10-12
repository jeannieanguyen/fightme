import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGeneralErrorSelector } from 'ducks/errors';

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
                <h3>{this.props.error}</h3>
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
