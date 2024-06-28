import { Test, TestingModule } from '@nestjs/testing';
import { GetAccountByIdController } from './GetAccountByIdController';
import { GetAccountByIdUseCase } from '../../usecase/GetAccountByIdUseCase/GetAccountByIdUseCase';
import { PrismaAccountRepository } from '../../../../infrastructure/database/prisma/repository/prisma.account.repository';
import { Account } from '../../../../domain/entities/Account';
import { NotFoundException } from '@nestjs/common';

describe('GetAccountByIdController', () => {
  let controller: GetAccountByIdController;
  let useCase: GetAccountByIdUseCase;
  let accountRepository: PrismaAccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAccountByIdController],
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

    controller = module.get<GetAccountByIdController>(GetAccountByIdController);
    useCase = module.get<GetAccountByIdUseCase>(GetAccountByIdUseCase);
    accountRepository = module.get<PrismaAccountRepository>(
      PrismaAccountRepository,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(useCase).toBeDefined();
    expect(accountRepository).toBeDefined();
  });

  describe('GET /account', () => {
    it('should return a account by id', async () => {
      const id = '1';
      const account = new Account({
        id,
        name: 'Account 1',
        type: 'CURRENT',
        balance: 100,
        createdAt: new Date(),
      });

      jest.spyOn(accountRepository, 'findById').mockResolvedValue(account);

      const result = await controller.execute(id);
      expect(result).toBeDefined();
      expect(result.name).toEqual('Account 1');
      expect(result.type).toEqual('CURRENT');
      expect(result.balance).toEqual(100);
      expect(result.createdAt).toEqual(account.createdAt);
    });

    it('should throw NotFoundException when account is not found', async () => {
      const id = '1';
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

      try {
        await controller.execute(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Account with id ${id} not found`);
      }
    });
  });
});
