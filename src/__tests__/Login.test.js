// React, Enzyme
import * as React from 'react';

// Own
import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('Login', () => {
  it('Login: renders correctly', async () => {
    const Login = (await import('../views/authentication/Login')).default;
    shallow(<Login />);
  });
})