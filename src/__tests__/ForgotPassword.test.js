// Own
import {
  shallow,
  setupTestConfiguration
} from '../utility/testing/TestConfiguration';

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