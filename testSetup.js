import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

configure({ adapter: new Adapter() });
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.apigClientFactory = {
  newClient: () => {},
};
global.React = React;
// Add these global objects into JSDOM so RxJS can use them
window.Array = Array;
window.Object = Object;
window.String = String;
window.Function = Function;
window.RegExp = RegExp;
window.Math = Math;
window.Number = Number;
window.Date = Date;
window.parseInt = parseInt;
copyProps(window, global);
