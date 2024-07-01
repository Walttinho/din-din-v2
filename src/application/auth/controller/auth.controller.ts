import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginAuthDto } from '../../../domain/dtos/LoginAuthDto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiResponse({
    status: 200,
    description: 'User authenticated.',
    schema: {
      example: {
        user: {
          id: 'df618536-a348-47c3-8438-fb40e7a1c51b',
          name: 'John Doe',
          email: 'john.doe@example.com',
          createdAt: '2024-06-30T22:00:32.828Z',
          updatedAt: '2024-06-30T22:00:32.976Z',
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZjYxODUzNi1hMzQ4LTQ3YzMtODQzOC1mYjQwZTdhMWM1MWIiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE5Nzg4MTU2LCJleHAiOjE3MTk3OTE3NTZ9.lLtLNTb7x3IiK6fIgLWJtE1zccYklbUrApv8U0mxnGw',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: {
      example: {
        message: 'Bad Request',
        error: 'BadRequestException',
        statusCode: 400,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'POST /auth',
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
        path: 'POST /auth',
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
        path: 'POST /auth',
      },
    },
  })
  @ApiBody({ type: LoginAuthDto })
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
