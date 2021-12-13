// Own
import Searchbar from '../components/search-bar/Searchbar';
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('Searchbar', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<Searchbar />);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange & Act
    wrapper = mount(<Searchbar searchString={'hello'} />);
    // Assert
    expect(wrapper.props().searchString).toEqual('hello');
  });
});