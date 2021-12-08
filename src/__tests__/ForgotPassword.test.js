// React, Enzyme
import * as React from 'react';

// Own
import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';
import FeaturedMovies from '../views/featuredMovies/FeaturedMovies';

// Test suite configuration
setupTestConfiguration();

describe('Forgot Password', () => {
  // Suite setup
  let wrapper;

  it('ForgotPassword: renders correctly', async () => {
    // Arrange & Act
    const ForgotPassword = (await import('../views/authentication/ForgotPassword')).default;
    wrapper = shallow(<ForgotPassword />);
    // Assert
    expect(wrapper).toBeDefined();
  });
})