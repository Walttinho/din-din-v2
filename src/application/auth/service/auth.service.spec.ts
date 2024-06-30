import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { LoginAuthDto } from '../../../domain/dtos/LoginAuthDto';
import { ResponseAuthDto } from '../../../domain/dtos/ResponseAuthDto';

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  describe('login', () => {
    it('should return an access token and user data', async () => {
      const loginAuthDto: LoginAuthDto = {
        email: 'test@test.com',
        password: 'password',
      };
      const responseAuthDto: ResponseAuthDto = {
        user: {
          id: '1',
          email: 'test@test.com',
          name: 'Test User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        token: 'token',
      };

      jest.spyOn(authRepository, 'login').mockResolvedValue(responseAuthDto);

      expect(await authService.login(loginAuthDto)).toBe(responseAuthDto);
    });
  });
});
