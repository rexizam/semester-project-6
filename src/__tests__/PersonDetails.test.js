// Own
import { Provider } from 'react-redux';
import { store } from '../redux/storeConfig/store';
import PersonDetails from '../views/PersonDetails/PersonDetails';
import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';

setupTestConfiguration();

describe('Person Details route', () => {
  // Suite setup
  let wrapper;

  it('should be rendered', async () => {
    // Arrange & Act
    wrapper = shallow(<Provider store={store}> <PersonDetails /> </Provider>);
    // Assert
    expect(wrapper).toBeDefined();
  });
});