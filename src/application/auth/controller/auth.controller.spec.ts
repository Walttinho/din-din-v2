import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { LoginAuthDto } from '../../../domain/dtos/LoginAuthDto';
import { ResponseAuthDto } from '../../../domain/dtos/ResponseAuthDto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
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

      jest.spyOn(authService, 'login').mockResolvedValue(responseAuthDto);

      expect(await authController.login(loginAuthDto)).toBe(responseAuthDto);
    });
  });
});
