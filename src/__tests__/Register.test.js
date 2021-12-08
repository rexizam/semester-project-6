// React, Enzyme
import * as React from 'react';

// Own
import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('Register', () => {
  it('Register: renders correctly', async () => {
    const Register = (await import('../views/authentication/Register')).default;
    shallow(<Register />);
  });
})