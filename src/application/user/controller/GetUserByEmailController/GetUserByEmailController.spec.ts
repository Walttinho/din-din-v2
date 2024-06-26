import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByEmailController } from './GetUserByEmailController';
import { GetUserByEmailUseCase } from '../../usecase/GetUserByEmailUseCase/GetUserByEmailUseCase';
import { PrismaUserRepository } from '../../../../infrastructure/database/prisma/repository/prisma.user.repository';
import { User } from '../../../../domain/entities/User';
import { NotFoundException } from '@nestjs/common';
describe('GetUserByEmailController', () => {
  let useCase: GetUserByEmailUseCase;
  let controller: GetUserByEmailController;
  let userRepository: PrismaUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUserByEmailController],
      providers: [
        GetUserByEmailUseCase,
        {
          provide: PrismaUserRepository,
          useValue: {
            findByEmail: jest
              .fn()
              .mockImplementation(() => Promise.resolve(null)),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetUserByEmailUseCase>(GetUserByEmailUseCase);
    userRepository = module.get<PrismaUserRepository>(PrismaUserRepository);
    controller = module.get<GetUserByEmailController>(GetUserByEmailController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
    expect(useCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('GET /users', () => {
    it('should return a user by email', async () => {
      const email = 'walter.netto@example.com';
      const user = new User({
        name: 'Walter Netto',
        email,
        password: 'password123',
      });

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);

      const result = await controller.execute(email);
      expect(result).toBeDefined();
      expect(result.name).toEqual('Walter Netto');
      expect(result.email).toEqual('walter.netto@example.com');
    });

    it('should return 404 when user is not found', async () => {
      const email = 'test@example.com';
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      try {
        await controller.execute(email);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`User with email ${email} not found`);
      }
    });
  });
});
