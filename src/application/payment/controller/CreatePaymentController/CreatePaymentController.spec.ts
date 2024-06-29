import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePaymentController } from './CreatePaymentController';
import { CreatePaymentUseCase } from '../../../../application/payment/useCase/CreatePaymentUseCase/CreatePaymentUseCase';
import { PrismaPaymentRepository } from '../../../../infrastructure/database/prisma/repository/prisma.payment.respository';
import { PrismaAccountRepository } from '../../../../infrastructure/database/prisma/repository/prisma.account.repository';

describe('CreatePaymentController', () => {
  let controller: CreatePaymentController;
  let useCase: CreatePaymentUseCase;
  let paymentRepository: PrismaPaymentRepository;
  let accountRepository: PrismaAccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatePaymentController],
      providers: [
        CreatePaymentUseCase,
        {
          provide: PrismaPaymentRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findByAccountId: jest.fn().mockImplementation(() => {
              return Promise.resolve(null);
            }),
          },
        },
        {
          provide: PrismaAccountRepository,
          useValue: {
            findById: jest.fn().mockImplementation(() => {
              return Promise.resolve(null);
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<CreatePaymentController>(CreatePaymentController);
    useCase = module.get<CreatePaymentUseCase>(CreatePaymentUseCase);
    paymentRepository = module.get<PrismaPaymentRepository>(
      PrismaPaymentRepository,
    );
    accountRepository = module.get<PrismaAccountRepository>(
      PrismaAccountRepository,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(useCase).toBeDefined();
    expect(paymentRepository).toBeDefined();
    expect(accountRepository).toBeDefined();
  });

  describe('POST /payment', () => {
    it('should create a new payment successfully', async () => {
      const createPaymentDto = {
        accountId: 'some-id',
        amount: 100,
        description: 'some description',
      };

      jest.spyOn(useCase, 'execute').mockResolvedValue({
        id: 'some-id',
        accountId: 'some-id',
        amount: 100,
        description: 'some description',
        createdAt: new Date(),
      });

      const result = await controller.execute(createPaymentDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.accountId).toEqual('some-id');
      expect(result.amount).toEqual(100);
      expect(result.description).toEqual('some description');
      expect(result.createdAt).toBeDefined();
    });

    it('should throw BadRequestException if accountId is missing', async () => {
      const createPaymentDto = {
        accountId: '',
        amount: 100,
        description: 'some description',
      };

      try {
        await controller.execute(createPaymentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Account id is required');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if amount is missing', async () => {
      const createPaymentDto = {
        accountId: 'some-id',
        amount: Number(''),
        description: 'some description',
      };

      try {
        await controller.execute(createPaymentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Amount is required');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if amount is negative', async () => {
      const createPaymentDto = {
        accountId: 'some-id',
        amount: -100,
        description: 'some description',
      };

      try {
        await controller.execute(createPaymentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Amount must be greater than 0');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if description is missing', async () => {
      const createPaymentDto = {
        accountId: 'some-id',
        amount: 100,
        description: '',
      };

      try {
        await controller.execute(createPaymentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Description is required');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if description is empty', async () => {
      const createPaymentDto = {
        accountId: 'some-id',
        amount: 100,
        description: '',
      };

      try {
        await controller.execute(createPaymentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Description should not be empty');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw NotFoundException if account not found', async () => {
      const createPaymentDto = {
        accountId: 'invalid-id',
        amount: 100,
        description: 'some description',
      };

      jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

      try {
        await controller.execute(createPaymentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Account not found');
        expect(error.error).toEqual('NotFoundException');
        expect(error.statusCode).toEqual(404);
      }
    });

    /*     it('should throw BadRequestException if account has no balance', async () => {
      const createPaymentDto = {
        accountId: 'invalid-id',
        amount: 100,
        description: 'some description',
      };

      jest.spyOn(accountRepository, 'findById').mockResolvedValue({
        id: 'invalid-id',
        name: 'Walter Netto',
        type: 'CURRENT',
        balance: 0,
        createdAt: new Date(),
      });

      try {
        await controller.execute(createPaymentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Account has no balance');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if account has insufficient balance', async () => {
      const createPaymentDto = {
        accountId: 'invalid-id',
        amount: 100,
        description: 'some description',
      };

      jest.spyOn(accountRepository, 'findById').mockResolvedValue({
        id: 'invalid-id',
        name: 'Walter Netto',
        type: 'CURRENT',
        balance: 50,
        createdAt: new Date(),
      });

      try {
        await controller.execute(createPaymentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Account has insufficient balance');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    }); */
  });
});
