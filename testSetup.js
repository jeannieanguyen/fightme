import React from 'react';
import { expect } from 'chai';
import jsdom from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const { JSDOM } = jsdom;
const doc = (new JSDOM('<!doctype html><html><body></body></html>'));
const win = doc.defaultView;

global.document = doc;
global.window = win;
global.React = React;
global.expect = expect;
global.apigClientFactory = { 
	newClient: () => {}
};