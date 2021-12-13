// Own
import {
  shallow,
  setupTestConfiguration
} from '../utility/testing/TestConfiguration';
import MovieCard from '../components/movie-card/MovieCard';

// Test suite configuration
setupTestConfiguration();

describe('MovieCard', () => {
  // Suite setup
  let wrapper;
  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<MovieCard />);
    // Assert
    expect(wrapper).toBeDefined();
  });
});