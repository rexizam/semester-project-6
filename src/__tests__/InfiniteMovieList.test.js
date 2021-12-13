// Own
import InfiniteMovieList from '../components/infinite-movie-list/InfiniteMovieList';
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('InfiniteMovieList', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<InfiniteMovieList />);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange & Act
    wrapper = mount(<InfiniteMovieList items={[{id: 1}, {id:2}, {id: 3}]} />);
    // Assert
    expect(wrapper.props().items).toEqual([{id: 1}, {id:2}, {id: 3}]);
    expect(wrapper.props().items.length).toEqual(3);
  });
});