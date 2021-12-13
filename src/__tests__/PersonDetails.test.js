// Own
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../redux/storeConfig/store';
import PersonDetails from '../views/PersonDetails/PersonDetails';
import { setupTestConfiguration } from '../utility/testing/TestConfiguration';

setupTestConfiguration();

describe('PersonDetails', () => {
  // Suite setup
  let wrapper;

  it('should be rendered', async () => {
    // Arrange & Act
    wrapper = shallow(<Provider store={store}> <PersonDetails /> </Provider>);
    // Assert
    expect(wrapper).toBeDefined();
  });
});