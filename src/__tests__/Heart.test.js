// Own
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import Heart from '../components/movie-card/Heart';

// Test suite configuration
setupTestConfiguration();

describe('Heart button', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<Heart />);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange & Act
    wrapper = mount(<Heart filled={true} size={40} movieId={123} strokeWidth={2}/>);
    // Assert
    expect(wrapper.props().filled).toEqual(true);
    expect(wrapper.props().size).toEqual(40);
    expect(wrapper.props().movieId).toEqual(123);
    expect(wrapper.props().strokeWidth).toEqual(2);
  });
});