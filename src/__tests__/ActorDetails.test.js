// Own
import {
  mount,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import ActorDetails from '../views/actors/ActorDetails';
import { actorDetails } from '../utility/testing/MockData';

// Test suite configuration
setupTestConfiguration();

describe('ActorDetails', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = mount(<ActorDetails actorDetails={actorDetails}/>);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with props.', async () => {
    // Arrange & Act
    wrapper = mount(<ActorDetails actorDetails={actorDetails}/>);
    // Assert
    expect(wrapper.props().actorDetails).toBe(actorDetails);
  });
});