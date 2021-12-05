// React, Enzyme
import * as React from 'react';

// Own
import { setupTestConfiguration, shallow } from './TestConfiguration';
import SearchMovies from '../views/searchMovies/SearchMovies';

// Test suite configuration
setupTestConfiguration();

describe('SearchMovies', () => {
  // Suite setup
  let wrapper;
  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<SearchMovies/>);
    // Assert
    expect(wrapper).toBeDefined();
    expect(wrapper.props().requestType).toBe('search');
  });
});