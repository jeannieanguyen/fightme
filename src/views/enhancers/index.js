import React, { Component } from 'react';
import { connect } from 'react-redux';
import errorHandlingDecorator from 'views/enhancers/errorHandling'
import withAuthentication from 'views/enhancers/authentication'

export {
  errorHandlingDecorator,
  withAuthentication,
};