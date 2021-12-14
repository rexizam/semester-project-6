// Own
import {
  shallow,
  setupTestConfiguration
} from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('Login route', () => {
  // Suite setup
  let wrapper;

  it('Login: renders correctly', async () => {
    // Arrange & Act
    const Login = (await import('../views/authentication/Login')).default;
    wrapper = shallow(<Login />);
    // Assert
    expect(wrapper).toBeDefined();
  });
})