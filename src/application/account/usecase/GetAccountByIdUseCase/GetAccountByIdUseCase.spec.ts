import { Test, TestingModule } from '@nestjs/testing';
import { GetAccountByIdUseCase } from './GetAccountByIdUseCase';
import { PrismaAccountRepository } from '../../../../infrastructure/database/prisma/repository/prisma.account.repository';

describe('GetAccountByIdUseCase', () => {
  let useCase: GetAccountByIdUseCase;
  let accountRepository: PrismaAccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAccountByIdUseCase,
        {
          provide: PrismaAccountRepository,
          useValue: {
            findById: jest.fn().mockImplementation(() => Promise.resolve(null)),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetAccountByIdUseCase>(GetAccountByIdUseCase);
    accountRepository = module.get<PrismaAccountRepository>(
      PrismaAccountRepository,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(accountRepository).toBeDefined();
  });

  it('should find an account by id', async () => {});

  it('should throw NotFoundException when account is not found', async () => {});
});
