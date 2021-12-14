// Own
import {
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import IntroScene from '../components/intro-scene-3d';

// Test suite configuration
setupTestConfiguration();

describe('IntroScene', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<IntroScene />);
    // Assert
    expect(wrapper).toBeDefined();
  });
});