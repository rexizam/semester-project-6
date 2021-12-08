// React, Enzyme
import * as React from 'react';

// Own
import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('Reset Password', () => {
  // Suite setup
  let wrapper;

  it('ResetPassword: renders correctly', async () => {
    // Arrange & Act
    const ResetPassword = (await import('../views/authentication/ResetPassword')).default;
    wrapper = shallow(<ResetPassword />);
    // Assert
    expect(wrapper).toBeDefined();
  });
})