import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './CreateUserUseCase';
import { User } from '../../../../domain/entities/User';
import { CreateUserDto } from '../../../../domain/dtos/CreateUserDto';
import { PrismaUserRepository } from '../../../../infrastructure/database/prisma/repository/prisma.user.repository';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: PrismaUserRepository;
  let userId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
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
            delete: jest.fn().mockImplementation(),
          },
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<PrismaUserRepository>(PrismaUserRepository);
  });

  afterAll(async () => {
    await userRepository.delete(userId);
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should create a new user with success', async () => {
    const user: CreateUserDto = {
      name: 'Walter Netto',
      email: 'walter@example.com.br',
      password: 'password123',
    };

    const result = await createUserUseCase.execute(user);
    userId = result.id;
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', user.name);
    expect(result).toHaveProperty('email', user.email);
    expect(result).not.toHaveProperty('password');
  });

  it('should execute within acceptable time', async () => {
    const user: CreateUserDto = {
      name: 'Renata Medeiros',
      email: 'renata@example.com.br',
      password: 'password123',
    };
    const start = Date.now();
    const result = await createUserUseCase.execute(user);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1000);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', user.name);
    expect(result).toHaveProperty('email', user.email);
    expect(result).not.toHaveProperty('password');
  });

  it('should throw BadRequestException if name is missing', async () => {
    const user: CreateUserDto = {
      name: '',
      email: 'walter@example.com.br',
      password: 'password123',
    };
    try {
      await createUserUseCase.execute(user);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('name should not be empty');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });

  it('should throw BadRequestException if email is missing', async () => {
    const user: CreateUserDto = {
      name: 'Walter Netto',
      email: '',
      password: 'password123',
    };
    try {
      await createUserUseCase.execute(user);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('email should not be empty');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });
  it('should throw BadRequestException if password is missing', async () => {
    const user: CreateUserDto = {
      name: 'Walter Netto',
      email: 'walter@example.com.br',
      password: '',
    };
    try {
      await createUserUseCase.execute(user);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('password should not be empty');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });

  it('should throw BadRequestException if email is invalid', async () => {
    const user: CreateUserDto = {
      name: 'Walter Netto',
      email: 'invalid-email',
      password: 'password123',
    };
    try {
      await createUserUseCase.execute(user);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Invalid email format');
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });
  it('should throw BadRequestException if password is too short', async () => {
    const user: CreateUserDto = {
      name: 'Walter Netto',
      email: 'walter@example.com.br',
      password: '123',
    };
    try {
      await createUserUseCase.execute(user);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual(
        'password must be longer than or equal to 8 characters',
      );
      expect(error.error).toEqual('BadRequestException');
      expect(error.statusCode).toEqual(400);
    }
  });

  it('should throw ConflictException if user already exists', async () => {
    const user: CreateUserDto = {
      name: 'Walter Netto',
      email: 'walter@example.com.br',
      password: 'password123',
    };
    await createUserUseCase.execute(user);
    try {
      await createUserUseCase.execute(user);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toEqual('email already in use');
      expect(error.error).toEqual('ConflictException');
      expect(error.statusCode).toEqual(409);
    }
  });
});
