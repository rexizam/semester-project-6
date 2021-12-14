// Own
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import Chart from '../components/chart/Chart';

// Test suite configuration
setupTestConfiguration();

describe('Chart', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<Chart chartId={'61b1bacc-87e0-46bb-8f20-7b6cd13aef3d'} />);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange & Act
    wrapper = mount(<Chart chartId={'61b1bacc-87e0-46bb-8f20-7b6cd13aef3d'} height={300} />);
    // Assert
    expect(wrapper.props().chartId).toEqual('61b1bacc-87e0-46bb-8f20-7b6cd13aef3d');
    expect(wrapper.props().height).toEqual(300);
  });
});