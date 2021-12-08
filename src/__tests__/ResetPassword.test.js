// React, Enzyme
import * as React from 'react';

// Own
import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('Reset Password', () => {
  it('ResetPassword: renders correctly', async () => {
    const ResetPassword = (await import('../views/authentication/ResetPassword')).default;
    shallow(<ResetPassword />);
  });
})