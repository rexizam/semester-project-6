// Own
import {
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import Analytics from '../views/analytics/Analytics';

// Test suite configuration
setupTestConfiguration();

describe('Analytics route', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<Analytics />);
    // Assert
    expect(wrapper).toBeDefined();
  });
});