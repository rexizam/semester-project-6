// Own
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../redux/storeConfig/store';
import FeaturedMovies from '../views/featuredMovies/FeaturedMovies';
import { setupTestConfiguration } from '../utility/testing/TestConfiguration';

setupTestConfiguration();

describe('FeaturedMovies', () => {
  // Suite setup
  let wrapper;

  it('should be rendered', async () => {
    // Arrange & Act
    wrapper = shallow(<Provider store={store}><FeaturedMovies /></Provider>);
    // Assert
    expect(wrapper).toBeDefined();
  });
});