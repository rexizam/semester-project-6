import { setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';
import Router from '../router/Router';

setupTestConfiguration();

describe('Router', () => {
  it('should be defined', () => {
    const routerWrapper = shallow(<Router />);
    expect(routerWrapper).toBeDefined();
  });
});