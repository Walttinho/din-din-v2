import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetUserByEmailUseCase } from '../../usecase/GetUserByEmailUseCase/GetUserByEmailUseCase';
import { AuthGuard } from '../../../../guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class GetUserByEmailController {
  constructor(private readonly getUserByEmailUseCase: GetUserByEmailUseCase) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiQuery({ name: 'email', type: String })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a user by email' })
  @ApiResponse({
    status: 200,
    description: 'User found.',
    schema: {
      example: {
        id: 'df618536-a348-47c3-8438-fb40e7a1c51b',
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: '2024-06-30T22:00:32.828Z',
        updatedAt: '2024-06-30T22:00:32.976Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: {
      example: {
        message: 'Invalid email',
        error: 'BadRequestException',
        statusCode: 400,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'GET /user',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    schema: {
      example: {
        message: 'User not found',
        error: 'NotFoundException',
        statusCode: 404,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'GET /user',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    schema: {
      example: {
        message: 'Unauthorized',
        error: 'UnauthorizedException',
        statusCode: 401,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'GET /user',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    schema: {
      example: {
        message: 'Internal server error',
        error: 'InternalServerErrorException',
        statusCode: 500,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'GET /user',
      },
    },
  })
  @ApiQuery({ name: 'email', required: true, type: String })
  async execute(@Query('email') email: string) {
    const user = await this.getUserByEmailUseCase.execute(email);
    return user;
  }
}
