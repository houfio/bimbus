import { middleware } from './middleware';
import { route } from './route';

const mockRoute = () => route('/')(
  middleware((ctx) => ctx)
);

it('should set the path', () => {
  const result = mockRoute();

  expect(result.path).toBe('/');
});
