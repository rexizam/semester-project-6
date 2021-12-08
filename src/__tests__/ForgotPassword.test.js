// React, Enzyme
import * as React from 'react';

// Own
import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('Forgot Password', () => {
  it('ForgotPassword: renders correctly', async () => {
    const ForgotPassword = (await import('../views/authentication/ForgotPassword')).default;
    shallow(<ForgotPassword />);
  });
})