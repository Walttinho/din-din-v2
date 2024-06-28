import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from '../../usecase/CreateUserUseCase/CreateUserUseCase';
import { PrismaUserRepository } from '../../../../infrastructure/database/prisma/repository/prisma.user.repository';
import { CreateUserDto } from '../../../../domain/dtos/CreateUserDto';
import { BadRequestException, ConflictException } from '@nestjs/common';
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
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findByEmail: jest.fn().mockImplementation(() => {
              return Promise.resolve(null);
            }),
            delete: jest.fn().mockImplementation(),
          },
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
  describe('POST /user', () => {
    it('should create a new user successfully', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Walter Netto',
        email: 'walter.netto@example.com',
        password: 'password123',
      };

      jest.spyOn(useCase, 'execute').mockResolvedValueOnce({
        id: 'some-id',
        name: 'Walter Netto',
        email: 'walter.netto@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await controller.execute(createUserDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toEqual('Walter Netto');
      expect(result.email).toEqual('walter.netto@example.com');
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it('should execute within acceptable time', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Walter Netto',
        email: 'walter.netto@example.com',
        password: 'password123',
      };

      jest.spyOn(useCase, 'execute').mockResolvedValueOnce({
        id: 'some-id',
        name: 'Walter Netto',
        email: 'walter.netto@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const startTime = Date.now();
      await controller.execute(createUserDto);
      const endTime = Date.now();

      const executionTime = endTime - startTime;

      expect(executionTime).toBeLessThan(200);
    });

    it('should throw BadRequestException if name is missing', async () => {
      const createUserDto: CreateUserDto = {
        name: '',
        email: 'walter.netto@example.com',
        password: 'password123',
      };

      try {
        await controller.execute(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('name should not be empty');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if email is missing', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Walter Netto',
        email: '',
        password: 'password123',
      };

      try {
        await controller.execute(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('email should not be empty');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if password is missing', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Walter Netto',
        email: 'walter.netto@example.com',
        password: '',
      };

      try {
        await controller.execute(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('password should not be empty');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if email is invalid', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Walter Netto',
        email: 'invalid-email',
        password: 'password123',
      };

      try {
        await controller.execute(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Invalid email format');
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw BadRequestException if password is too short', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Walter Netto',
        email: 'walter.netto@example.com',
        password: '123',
      };

      try {
        await controller.execute(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual(
          'password must be longer than or equal to 8 characters',
        );
        expect(error.error).toEqual('BadRequestException');
        expect(error.statusCode).toEqual(400);
      }
    });

    it('should throw ConflictException if email is already in use', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Walter Netto',
        email: 'walter.netto@example.com',
        password: 'password123',
      };

      await controller.execute(createUserDto);

      try {
        await controller.execute(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toEqual('email already in use');
        expect(error.error).toEqual('ConflictException');
        expect(error.statusCode).toEqual(409);
      }
    });
  });
});
