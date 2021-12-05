// Own
import { setupTestConfiguration, shallow } from './TestConfiguration';
import FeaturedMovies from '../views/featuredMovies/FeaturedMovies';

// Test suite configuration
setupTestConfiguration();

describe('SearchMovies', () => {
  // Suite setup
  let wrapper;
  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<FeaturedMovies />);
    // Assert
    expect(wrapper).toBeDefined();
    expect(wrapper.props().requestType).toBe('featured');
  });
});