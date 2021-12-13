// Own
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import FavouriteMoviesCard from '../views/favouriteMovies/FavouriteMoviesCard';
import MovieCard from '../components/movie-card/MovieCard';
import { favouriteIds } from '../utility/testing/MockData';

// Test suite configuration
setupTestConfiguration();

describe('FavouriteMoviesCard', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<FavouriteMoviesCard />);
    // Assert
    expect(wrapper).toBeDefined();
  });
});