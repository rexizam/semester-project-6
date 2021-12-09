// Own
import {
  shallow,
  setupTestConfiguration
} from '../utility/testing/TestConfiguration';
import SearchMovies from '../views/searchMovies/SearchMovies';

// Test suite configuration
setupTestConfiguration();

describe('SearchMovies', () => {
  // Suite setup
  let wrapper;
  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<SearchMovies/>);
    // Assert
    expect(wrapper).toBeDefined();
    expect(wrapper.props().requestType).toBe('search');
  });
});