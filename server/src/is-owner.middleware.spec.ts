import { IsOwnerMiddleware } from './is-owner.middleware';

describe('IsOwnerMiddleware', () => {
  it('should be defined', () => {
    expect(new IsOwnerMiddleware()).toBeDefined();
  });
});
