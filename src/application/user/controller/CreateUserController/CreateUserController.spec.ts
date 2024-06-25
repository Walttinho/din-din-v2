import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from '../../usecase/CreateUserUseCase/CreateUserUseCase';
import { PrismaUserRepository } from '../../../../infrastructure/database/prisma/repository/prisma.user.repository';
describe('CreateUserController', () => {
  let useCase: CreateUserUseCase;
  let controller: CreateUserController;
  let userRepository: PrismaUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        CreateUserUseCase,
        {
          provide: PrismaUserRepository,
          useValue: {},
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<PrismaUserRepository>(PrismaUserRepository);
    controller = module.get<CreateUserController>(CreateUserController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
    expect(useCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
