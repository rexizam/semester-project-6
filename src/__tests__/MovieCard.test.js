// Own
import {
  mount,
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
  describe('should be rendered', () => {
    const setPage = (newPageNumber) => {
      wrapper.props().page = newPageNumber;
    }
    it('with initial props.', async () => {
      // Arrange & Act
      wrapper = mount(<MovieCard isFavourite={false} loading={true} loadMore={true} page={2} setPage={setPage}/>);
      // Assert
      expect(wrapper.props().isFavourite).toBe(false);
      expect(wrapper.props().loading).toBe(true);
      expect(wrapper.props().loadMore).toBe(true);
      expect(wrapper.props().page).toBe(2);
    });
    it('with initial props and change the page number.', async () => {
      // Arrange
      const setPage = (newPageNumber) => {
        wrapper.props().page = newPageNumber;
      }
      wrapper = mount(<MovieCard isFavourite={false} loading={true} loadMore={true} page={2} setPage={setPage}/>);
      // Act
      wrapper.props().setPage(5);
      // Assert
      expect(wrapper.props().isFavourite).toBe(false);
      expect(wrapper.props().loading).toBe(true);
      expect(wrapper.props().loadMore).toBe(true);
      expect(wrapper.props().page).toBe(5);
    });
  });
});