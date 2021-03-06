import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'dangerously' });
const { window } = jsdom;

configure({ adapter: new Adapter() });
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.React = React;
