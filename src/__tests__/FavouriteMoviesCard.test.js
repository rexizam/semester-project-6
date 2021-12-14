// Own
import {
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import FavouriteMoviesCard from '../views/favouriteMovies/FavouriteMoviesCard';
import { QueryClient, QueryClientProvider } from 'react-query';

// Test suite configuration
setupTestConfiguration();
const queryClient = new QueryClient();

describe('Favourite Movies Card', () => {
  // Suite setup
  let wrapper;

  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <FavouriteMoviesCard />
      </QueryClientProvider>
    );
    // Assert
    expect(wrapper).toBeDefined();
  });
});