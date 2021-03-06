// Own
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import MovieRating from '../components/movie-details/MovieRating';

// Test suite configuration
setupTestConfiguration();

describe('Movie Rating', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<MovieRating />);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange & Act
    wrapper = mount(<MovieRating rating={5.5} />);
    // Assert
    expect(wrapper.props().rating).toEqual(5.5);
  });
});