// Own
import {
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import SearchActors from '../views/actors/SearchActors';

// Test suite configuration
setupTestConfiguration();

describe('SearchActors', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<SearchActors />);
    // Assert
    expect(wrapper).toBeDefined();
  });
});