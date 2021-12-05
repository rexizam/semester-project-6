import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';
import App from '../App';

setupTestConfiguration();
/**
 * Test if the application as a whole renders without errors
 */
describe('App', () => {
  it('renders without crashing', async () => {
    const App = (await import('../App')).default;
    shallow(<App />);
  });
});