// Own
import {
  shallow,
  setupTestConfiguration
} from '../utility/testing/TestConfiguration';
import FavouriteMoviesCard from '../views/favouriteMovies/FavouriteMoviesCard';
import { favouriteIds } from './testUtilities';
import MovieCard from '../components/movie-card/MovieCard';

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

  it('should be rendered with favouriteMovieId and be favourite.', async () => {
    // Arrange & Act
    wrapper = mount(<MovieCard favouriteMovieId={favouriteIds[0]}/>);
    // Assert
    expect(wrapper.props().favouriteMovieId).toEqual(favouriteIds[0]);
  });

  it('should be be favourite.', async () => {
    // Arrange & Act
    wrapper = shallow(<FavouriteMoviesCard />);
    // Assert
    expect(wrapper.props().children.props.isFavourite).toEqual(true);
  });
});