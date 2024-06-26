import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByEmailUseCase } from './GetUserByEmailUseCase';
import { PrismaUserRepository } from '../../../../infrastructure/database/prisma/repository/prisma.user.repository';
import { User } from '../../../../domain/entities/User';

describe('GetUserByEmailUseCase', () => {
  let getUserByEmailUseCase: GetUserByEmailUseCase;
  let userRepository: PrismaUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByEmailUseCase,
        {
          provide: PrismaUserRepository,
          useValue: {
            create: jest.fn().mockImplementation((user) => {
              return Promise.resolve(
                new User({
                  ...user.props,
                  _id: user._id,
                }),
              );
            }),
            findByEmail: jest.fn().mockImplementation(() => {
              return Promise.resolve(null);
            }),
          },
        },
      ],
    }).compile();

    getUserByEmailUseCase = module.get<GetUserByEmailUseCase>(
      GetUserByEmailUseCase,
    );
    userRepository = module.get<PrismaUserRepository>(PrismaUserRepository);
  });

  afterEach(() => {
    //TODO: implemente remover os dados criados nos teste
  });

  it('should be defined', () => {
    expect(getUserByEmailUseCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should find a user by email', async () => {});

  it('should throw NotFoundException when user is not found', async () => {});
});
