// Own
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../redux/storeConfig/store';
import SearchMovies from '../views/searchMovies/SearchMovies';
import { setupTestConfiguration } from '../utility/testing/TestConfiguration';

setupTestConfiguration();

describe('SearchMovies', () => {
  // Suite setup
  let wrapper;

  it('should be rendered', async () => {
    // Arrange & Act
    wrapper = shallow(<Provider store={store}> <SearchMovies /> </Provider>);
    // Assert
    expect(wrapper).toBeDefined();
  });
});