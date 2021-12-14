// Own
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import Profiles from '../components/movie-details/Profiles';

// Test suite configuration
setupTestConfiguration();

describe('Profiles', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<Profiles />);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange & Act
    wrapper = mount(<Profiles data={{id: 1, name: 'Bob'}} profileType={'Actor'} />);
    // Assert
    expect(wrapper.props().data).toEqual({id: 1, name: 'Bob'});
    expect(wrapper.props().profileType).toEqual('Actor');
  });
});