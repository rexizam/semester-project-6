// Own
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../redux/storeConfig/store';
import FavouriteMovies from '../views/favouriteMovies/FavouriteMovies';
import { setupTestConfiguration } from '../utility/testing/TestConfiguration';

setupTestConfiguration();

describe('FavouriteMovies', () => {
  // Suite setup
  let wrapper;

  it('should be rendered', async () => {
    // Arrange & Act
    wrapper = shallow(<Provider store={store}><FavouriteMovies /></Provider>);
    // Assert
    expect(wrapper).toBeDefined();
  });
});