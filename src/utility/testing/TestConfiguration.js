import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime/runtime';
import React from 'react';

/**
 * Test setup wrapper (used in each test suite)
 */
export const setupTestConfiguration = () => {
  global.React = React;
  configure({ adapter: new Adapter() });
};

// Used to render the component without its children.
export const { shallow } = require('enzyme');
// Used to render the component with its children.
export const { mount } = require('enzyme');