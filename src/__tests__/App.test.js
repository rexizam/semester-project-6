import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime/runtime';
import React from 'react';

global.React = React;
configure({ adapter: new Adapter() });
const { shallow } = require('enzyme');

/**
 * Test if the application as a whole renders without errors
 */

it("renders without crashing", async () => {
  const App = (await import('../App')).default;
  shallow(<App />);
});