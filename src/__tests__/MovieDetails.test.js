// Own
import { Provider } from 'react-redux';
import { store } from '../redux/storeConfig/store';
import MovieDetails from '../views/movieDetails/MovieDetails';
import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';

setupTestConfiguration();

describe('Movie Details route', () => {
  // Suite setup
  let wrapper;

  it('should be rendered', async () => {
    // Arrange & Act
    wrapper = shallow(<Provider store={store}> <MovieDetails /> </Provider>);
    // Assert
    expect(wrapper).toBeDefined();
  });
});