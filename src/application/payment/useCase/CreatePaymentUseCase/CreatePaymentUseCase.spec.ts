import { Test, TestingModule } from '@nestjs/testing';
import { CreatePaymentUseCase } from './CreatePaymentUseCase';
import { PrismaPaymentRepository } from '../../../../infrastructure/database/prisma/repository/prisma.payment.respository';
import { Account } from '../../../../domain/entities/Account';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('CreatePaymentUseCase', () => {
  let useCase: CreatePaymentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePaymentUseCase,
        {
          provide: PrismaPaymentRepository,
          useValue: {
            create: jest.fn().mockImplementation((payment) => {
              return Promise.resolve(
                new Account({
                  ...payment.props,
                  _id: payment._id,
                }),
              );
            }),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreatePaymentUseCase>(CreatePaymentUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new payment with success', async () => {
    const result = await useCase.execute({
      accountId: 'some-id',
      amount: 100,
      description: 'some description',
    });

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('accountId');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('description');
  });

  it('should throw BadRequestException if value is negative', async () => {
    try {
      await useCase.execute({
        accountId: 'some-id',
        amount: -100,
        description: 'some description',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Value cannot be negative');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });

  it('should throw BadRequestException if accountId is missing', async () => {
    try {
      await useCase.execute({
        accountId: '',
        amount: 100,
        description: 'some description',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Account id is required');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });

  it('should throw BadRequestException if description is missing', async () => {
    try {
      await useCase.execute({
        accountId: 'some-id',
        amount: 100,
        description: '',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Description is required');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });

  it('should throw BadRequestException if value is missing', async () => {
    try {
      await useCase.execute({
        accountId: 'some-id',
        amount: Number(''),
        description: 'some description',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Value is required');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });

  it('should throw UnauthorizedException if accountId is invalid', async () => {
    try {
      await useCase.execute({
        accountId: 'invalid-id',
        amount: 100,
        description: 'some description',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toEqual('Account not found');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(401);
    }
  });

  it('should throw BadRequestException if account has no balance', async () => {
    try {
      await useCase.execute({
        accountId: 'invalid-id',
        amount: 100,
        description: 'some description',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Account has no balance');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });
});
