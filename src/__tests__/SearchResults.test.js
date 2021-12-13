// Own
import {
  mount,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import SearchResults from '../views/actors/SearchResults';
import { results } from '../utility/testing/MockData';

// Test suite configuration
setupTestConfiguration();

describe('SearchResults', () => {
  // Suite setup
  let wrapper;
  const setSearchString = (newSearchString) => {
    wrapper.props().searchString = newSearchString;
  }

  const setActorDetails = (newActorDetails) => {
    wrapper.props().actorDetails = newActorDetails;
  }

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = mount(<SearchResults results={results} searchString={'Ryan Reynolds'} setSearchString={setSearchString} setActorDetails={setActorDetails}/>);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered and have props.', async () => {
    // Arrange & Act
    wrapper = mount(<SearchResults results={results} searchString={'Ryan Reynolds'} setSearchString={setSearchString} setActorDetails={setActorDetails}/>);
    // Assert
    expect(wrapper.props().results).toBe(results);
    expect(wrapper.props().searchString).toBe('Ryan Reynolds');
    expect(wrapper.props().setSearchString).toBeDefined();
    expect(wrapper.props().setActorDetails).toBeDefined();
  });

  it('should be rendered and have props that can be changed.', async () => {
    // Arrange & Act
    wrapper = mount(<SearchResults results={results} searchString={'Ryan Reynolds'} setSearchString={setSearchString} setActorDetails={setActorDetails}/>);
    // Act
    wrapper.props().setSearchString('Ryan J. Reynolds');
    // Assert
    expect(wrapper.props().results).toBe(results);
    expect(wrapper.props().searchString).toBe('Ryan J. Reynolds');
    expect(wrapper.props().setSearchString).toBeDefined();
    expect(wrapper.props().setActorDetails).toBeDefined();
  });
});