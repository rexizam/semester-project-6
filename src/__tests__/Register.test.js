// Own
import {
  shallow,
  setupTestConfiguration
} from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('Register', () => {
  // Suite setup
  let wrapper;

  it('Register: renders correctly', async () => {
    // Arrange & Act
    const Register = (await import('../views/authentication/Register')).default;
    wrapper = shallow(<Register />);
    // Assert
    expect(wrapper).toBeDefined();
  });
})