// Own
import {
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import FavouritesButton from '../components/movie-details/FavouritesButton';

// Test suite configuration
setupTestConfiguration();

describe('Favourites Button', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<FavouritesButton />);
    // Assert
    expect(wrapper).toBeDefined();
  });
});