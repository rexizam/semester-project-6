// Own
import Rating from '../components/movie-card/Rating';
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('Rating', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<Rating />);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange & Act
    wrapper = mount(<Rating rating={5.5} />);
    // Assert
    expect(wrapper.props().rating).toEqual(5.5);
  });
});