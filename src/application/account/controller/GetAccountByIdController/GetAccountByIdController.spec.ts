import { Test, TestingModule } from '@nestjs/testing';
import { GetAccountByIdController } from './GetAccountByIdController';
import { GetAccountByIdUseCase } from '../../usecase/GetAccountByIdUseCase/GetAccountByIdUseCase';
import { PrismaAccountRepository } from '../../../../infrastructure/database/prisma/repository/prisma.account.repository';
import { Account } from '../../../../domain/entities/Account';
import { NotFoundException } from '@nestjs/common';
import { Payment } from '../../../../domain/entities/Payment';
import { PrismaPaymentRepository } from '../../../../infrastructure/database/prisma/repository/prisma.payment.respository';

describe('GetAccountByIdController', () => {
  let controller: GetAccountByIdController;
  let useCase: GetAccountByIdUseCase;
  let accountRepository: PrismaAccountRepository;
  let createPayment: PrismaPaymentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAccountByIdController],
      providers: [
        GetAccountByIdUseCase,

        {
          provide: PrismaAccountRepository,
          useValue: {
            create: jest.fn().mockImplementation(),
            findById: jest.fn().mockImplementation(() => Promise.resolve(null)),
          },
        },
        {
          provide: PrismaPaymentRepository,
          useValue: {
            create: jest.fn().mockImplementation(),
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
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');
      const account = new Account({
        id,
        name: 'Account 1',
        type: 'CURRENT',
        balance: 100,
        createdAt: new Date(),
      });

      jest.spyOn(accountRepository, 'findById').mockResolvedValue(account);

      const result = await controller.execute(id, startDate, endDate);
      expect(result).toBeDefined();
      expect(result.name).toEqual('Account 1');
      expect(result.type).toEqual('CURRENT');
      expect(result.balance).toEqual(100);
      expect(result.createdAt).toEqual(account.createdAt);
    });

    it('should throw NotFoundException when account is not found', async () => {
      const id = '1';
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

      try {
        await controller.execute(id, startDate, endDate);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Account with id ${id} not found`);
      }
    });

    it('should return an account by id with payments', async () => {
      const id = '1';
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');
      const account = new Account({
        id,
        name: 'Account 1',
        type: 'CURRENT',
        balance: 100,
        createdAt: new Date(),
        payments: [
          new Payment({
            id: 'payment1',
            accountId: '1',
            amount: 100,
            description: 'Payment 1',
            createdAt: new Date(),
          }),
        ],
      });
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(account);

      const result = await controller.execute(id, startDate, endDate);
      expect(result).toBeDefined();
      expect(result.name).toEqual('Account 1');
      expect(result.type).toEqual('CURRENT');
      expect(result.balance).toEqual(100);
      expect(result.createdAt).toEqual(account.createdAt);
      expect(result.payments).toEqual(account.payments);
    });

    it('should update account balance after successful payment', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue({
        id: 'valid-id',
        name: 'Walter Netto',
        type: 'CURRENT',
        balance: 100,
        createdAt: new Date(),
      } as any);

      const payment = new Payment({
        id: 'valid-payment-id',
        accountId: 'valid-id',
        amount: 50,
        description: 'some description',
        createdAt: new Date(),
      });

      try {
        await createPayment.create(payment);
      } catch (error) {
        throw new Error('Payment should be successful');
      }

      expect(accountRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({
          balance: 50,
        }),
      );
    });
    it('should return an account by id with filtered payments', async () => {
      const id = '1';
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');const account = new Account({
        id,
        name: 'Account 1',
        type: 'CURRENT',
        balance: 600, // Ensure this is the correct initial balance
        createdAt: new Date(),
        payments: [
          new Payment({
            id: 'payment1',
            accountId: '1',
            amount: 100,
            description: 'Payment 1',
            createdAt: new Date(),
          }),
          new Payment({
            id: 'payment2',
            accountId: '1',
            amount: 200,
            description: 'Payment 2',
            createdAt: new Date(),
          }),
        ],
      });
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(account);

      const result = await controller.execute(id, startDate, endDate);

      expect(result).toBeDefined();
      expect(result.name).toEqual('Account 1');
      expect(result.type).toEqual('CURRENT');
      expect(result.balance).toEqual(300); // This will fail if the balance is not correctly updated
      expect(result.createdAt).toEqual(account.createdAt);
      expect(result.payments).toEqual([
        {
          id: 'payment1',
          accountId: '1',
          amount: 100,
          description: 'Payment 1',
          createdAt: account.payments[0].createdAt,
        },
        {
          id: 'payment2',
          accountId: '1',
          amount: 200,
          description: 'Payment 2',
          createdAt: account.payments[1].createdAt,
        },
      ]);
    });

    it('should return an BadRequestException when id is missing', async () => {});
    it('should return an BadRequestException when start date is missing', async () => {});
    it('should return an BadRequestException when end date is missing', async () => {});
  });
});
