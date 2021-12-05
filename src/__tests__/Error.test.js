// Own
import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';
import Error from '../views/error/Error';

// Test suite configuration
setupTestConfiguration();

describe('Error', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<Error/>);
    // Assert
    expect(wrapper).toBeDefined();
  });
});