import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateAccountUseCase } from '../../usecase/CreateAccountUseCase/CreateAccountUseCase';
import { CreateAccountDto } from '../../../../domain/dtos/CreateAccountDto';
import { AuthGuard } from '../../../../guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Account')
@Controller('account')
export class CreateAccountController {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new bank account' })
  @ApiResponse({
    status: 201,
    description: 'Account successfully created.',
    schema: {
      example: {
        id: '11cd6603-01d8-4d90-a800-3cc0a7df0851',
        name: 'Account 01',
        type: 'CURRENT',
        balance: 1000,
        createdAt: '2024-06-30T22:59:46.606Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: {
      example: {
        message: 'Invalid account type',
        error: 'BadRequestException',
        statusCode: 400,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'POST /account',
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
        path: 'POST /account',
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
        path: 'POST /account',
      },
    },
  })
  @ApiBody({ type: CreateAccountDto })
  async execute(@Body() createAccountDto: CreateAccountDto) {
    const result = await this.createAccountUseCase.execute(createAccountDto);
    return result;
  }
}
