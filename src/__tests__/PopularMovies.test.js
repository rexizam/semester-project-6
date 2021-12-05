// Own
import { setupTestConfiguration, shallow } from './TestConfiguration';
import PopularMovies from '../views/popularMovies/PopularMovies';

// Test suite configuration
setupTestConfiguration();

describe('PopularMovies', () => {
  // Suite setup
  let wrapper;
  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<PopularMovies/>);
    // Assert
    expect(wrapper).toBeDefined();
    expect(wrapper.props().requestType).toBe('popular');
  });
});