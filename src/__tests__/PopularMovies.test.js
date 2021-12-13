// Own
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../redux/storeConfig/store';
import PopularMovies from '../views/popularMovies/PopularMovies';
import { setupTestConfiguration } from '../utility/testing/TestConfiguration';

setupTestConfiguration();

describe('PopularMovies', () => {
  // Suite setup
  let wrapper;

  it('should be rendered', async () => {
    // Arrange & Act
    wrapper = shallow(<Provider store={store}> <PopularMovies /> </Provider>);
    // Assert
    expect(wrapper).toBeDefined();
  });
});