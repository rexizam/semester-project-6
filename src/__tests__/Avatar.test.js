// Own
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import Avatar from '../@core/components/avatar';

// Test suite configuration
setupTestConfiguration();

describe('Avatar component', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<Avatar />);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange & Act
    wrapper = mount(<Avatar color={'secondary'} size={'sm'} badgeColor={'primary'} badgeText={'CI'}/>);
    // Assert
    expect(wrapper.props().color).toEqual('secondary');
    expect(wrapper.props().size).toEqual('sm');
    expect(wrapper.props().badgeColor).toEqual('primary');
    expect(wrapper.props().badgeText).toEqual('CI');
  });
});