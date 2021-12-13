// Own
import StarRating from '../components/star-rating/StarRating';
import {
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('MovieRecommendations', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<StarRating />);
    // Assert
    expect(wrapper).toBeDefined();
  });
});