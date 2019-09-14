import { IsAuthenticatedOrReadOnlyMiddleware } from './is-authenticated-or-read-only.middleware';

describe('IsAuthenticatedOrReadOnlyMiddleware', () => {
  it('should be defined', () => {
    expect(new IsAuthenticatedOrReadOnlyMiddleware()).toBeDefined();
  });
});
