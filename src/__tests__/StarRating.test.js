// Own
import {
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import StarRating from '../components/star-rating/StarRating';

// Test suite configuration
setupTestConfiguration();

describe('Star Rating', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<StarRating />);
    // Assert
    expect(wrapper).toBeDefined();
  });
});