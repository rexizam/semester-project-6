// Own
import Router from '../router/Router';
import {
  shallow,
  setupTestConfiguration
} from '../utility/testing/TestConfiguration';

setupTestConfiguration();

describe('Router', () => {
  it('should be defined', () => {
    const routerWrapper = shallow(<Router />);
    expect(routerWrapper).toBeDefined();
  });
});