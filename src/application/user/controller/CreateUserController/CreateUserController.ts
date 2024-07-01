import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../usecase/CreateUserUseCase/CreateUserUseCase';
import { CreateUserDto } from '../../../../domain/dtos/CreateUserDto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    schema: {
      example: {
        id: 'df618536-a348-47c3-8438-fb40e7a1c51b',
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: '2024-06-30T22:00:32.828Z',
        updatedAt: '2024-06-30T22:00:32.828Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: {
      example: {
        message: 'Invalid email format',
        error: 'BadRequestException',
        statusCode: 400,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'POST /user',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict.',
    schema: {
      example: {
        message: 'email already in use',
        error: 'ConflictException',
        statusCode: 409,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'POST /user',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    schema: {
      example: {
        message: 'Internal Server Error',
        error: 'InternalServerErrorException',
        statusCode: 500,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'POST /user',
      },
    },
  })
  @ApiBody({ type: CreateUserDto })
  async execute(@Body() createUserDto: CreateUserDto) {
    const result = await this.createUserUseCase.execute(createUserDto);
    return result;
  }
}
