import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountUseCase } from './CreateAccountUseCase';
import { PrismaAccountRepository } from '../../../../infrastructure/database/prisma/repository/prisma.account.repository';
import { Account } from '../../../../domain/entities/Account';
import { BadRequestException } from '@nestjs/common';

describe('CreateAccountUseCase', () => {
  let createAccountUseCase: CreateAccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountUseCase,
        {
          provide: PrismaAccountRepository,
          useValue: {
            create: jest.fn().mockImplementation((account) => {
              return Promise.resolve(
                new Account({
                  ...account.props,
                  _id: account._id,
                }),
              );
            }),
          },
        },
      ],
    }).compile();

    createAccountUseCase =
      module.get<CreateAccountUseCase>(CreateAccountUseCase);
  });

  it('should be defined', () => {
    expect(createAccountUseCase).toBeDefined();
  });

  it('should create a new account with success', async () => {
    const result = await createAccountUseCase.execute({
      name: 'Walter Netto',
      type: 'CURRENT',
      balance: 1000,
    });

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', 'Walter Netto');
    expect(result).toHaveProperty('type', 'CURRENT');
    expect(result).toHaveProperty('balance', 1000);
  });

  it('should throw BadRequestException if balance is negative', async () => {
    try {
      await createAccountUseCase.execute({
        name: 'Walter Netto',
        type: 'CURRENT',
        balance: -1000,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Initial balance cannot be negative');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });

  it('should throw BadRequestException if name is missing', async () => {
    try {
      await createAccountUseCase.execute({
        name: '',
        type: 'CURRENT',
        balance: 1000,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('name should not be empty');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });

  it('should throw BadRequestException if type is invalid', async () => {
    try {
      await createAccountUseCase.execute({
        name: 'Walter Netto',
        type: 'INVALID' as any,
        balance: 1000,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Invalid account type');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });
});
