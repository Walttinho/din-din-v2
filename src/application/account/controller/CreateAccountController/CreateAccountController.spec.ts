import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountController } from './CreateAccountController';
import { CreateAccountUseCase } from '../../usecase/CreateAccountUseCase/CreateAccountUseCase';
import { PrismaAccountRepository } from '../../../../infrastructure/database/prisma/repository/prisma.account.repository';
import { CreateAccountDto } from 'src/domain/dtos/CreateAccountDto';
import { BadRequestException } from '@nestjs/common';

describe('CreateAccountController', () => {
  let controller: CreateAccountController;
  let useCase: CreateAccountUseCase;
  let accountRepository: PrismaAccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateAccountController],
      providers: [
        CreateAccountUseCase,
        {
          provide: PrismaAccountRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateAccountUseCase>(CreateAccountUseCase);
    accountRepository = module.get<PrismaAccountRepository>(
      PrismaAccountRepository,
    );
    controller = module.get<CreateAccountController>(CreateAccountController);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(accountRepository).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('POST /account', () => {
    it('should create a new account successfully', async () => {
      const createAccountDto: CreateAccountDto = {
        name: 'Walter Netto',
        type: 'CURRENT',
        balance: 0,
      };

      jest.spyOn(useCase, 'execute').mockResolvedValueOnce({
        id: 'some-id',
        name: 'Walter Netto',
        type: 'CURRENT',
        balance: 0,
        createdAt: new Date(),
      });

      const result = await controller.execute(createAccountDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toEqual('Walter Netto');
      expect(result.type).toEqual('CURRENT');
      expect(result.balance).toEqual(0);
      expect(result.createdAt).toBeDefined();
    });

    it('should throw BadRequestException if name is missing', async () => {
      const createAccountDto: CreateAccountDto = {
        name: '',
        type: 'CURRENT',
        balance: 0,
      };

      try {
        await controller.execute(createAccountDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('name should not be empty');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if type is invalid', async () => {
      const createAccountDto: CreateAccountDto = {
        name: 'Walter Netto',
        type: 'INVALID' as any,
        balance: 0,
      };

      try {
        await controller.execute(createAccountDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('type must be a valid enum value');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if balance is negative', async () => {
      const createAccountDto: CreateAccountDto = {
        name: 'Walter Netto',
        type: 'CURRENT',
        balance: -1000,
      };

      try {
        await controller.execute(createAccountDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Initial balance cannot be negative');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });
  });
});
