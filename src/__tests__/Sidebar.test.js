// Own
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import Sidebar from '../@core/components/sidebar';

// Test suite configuration
setupTestConfiguration();

describe('Sidebar component', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange
    const children = [
      <div key={1}>
        {'string'}
      </div>
    ];

    const toggle = () => {
      console.log('toggled');
    }

    // Act
    wrapper = shallow(<Sidebar title={'Menu'} open={true} toggleSidebar={toggle} children={children} />);

    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange
    const children = [
      <div key={1}>
        {'string'}
      </div>
    ];

    const toggle = () => {
      console.log('toggled');
    }

    // Act
    wrapper = mount(<Sidebar size={'sm'} title={'Menu'} open={true} toggleSidebar={toggle} children={children} />);

    // Assert
    expect(wrapper.props().size).toEqual('sm');
    expect(wrapper.props().open).toEqual(true);
    expect(wrapper.props().title).toEqual('Menu');
  });
});