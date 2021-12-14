// Own
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import MovieRecommendations from '../components/movie-recommendations/MovieRecommendations';

// Test suite configuration
setupTestConfiguration();

describe('Movie Recommendations', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<MovieRecommendations />);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange & Act
    wrapper = mount(<MovieRecommendations favourites={[{id: 1}, {id:2}, {id: 3}]} id={3} />);
    // Assert
    expect(wrapper.props().favourites).toEqual([{id: 1}, {id:2}, {id: 3}]);
    expect(wrapper.props().favourites.length).toEqual(3);
    expect(wrapper.props().id).toEqual(3);
  });
});