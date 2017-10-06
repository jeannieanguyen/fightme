import React, { Component } from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import LoginPage from './login';

describe('Login Page Component', () => {

  function logUser() {
    console.log('yo');
  }

  const props = {
    loginUser: logUser
  };

  it('renders an email input', () => {
    const el = shallow(<LoginPage {...props} />);

    expect(el.find('input[name=email]')).to.have.length(1);
  });
});
