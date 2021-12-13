// Own
import FavouritesButton from '../components/movie-details/FavouritesButton';
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('FavouritesButton', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<FavouritesButton />);
    // Assert
    expect(wrapper).toBeDefined();
  });
});