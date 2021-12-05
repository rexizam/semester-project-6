import { setupTestConfiguration, shallow } from './TestConfiguration';
import Router from '../router/Router';

setupTestConfiguration();

describe('Router', () => {
  it('should be defined', () => {
    const routerWrapper = shallow(<Router />);
    expect(routerWrapper).toBeDefined();
  });
});