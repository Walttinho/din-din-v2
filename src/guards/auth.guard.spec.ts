import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    authGuard = new AuthGuard(reflector);
  });

  it('should return true if user is valid', () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { userId: 1, email: 'test@test.com' },
        }),
      }),
    } as any;

    const result = authGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw an UnauthorizedException if user is invalid', () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
    } as any;

    try {
      authGuard.canActivate(context);
    } catch (error) {
      expect(error.message).toBe('Unauthorized');
    }
  });
});
