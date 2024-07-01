import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetAccountByIdUseCase } from '../../usecase/GetAccountByIdUseCase/GetAccountByIdUseCase';
import { viewModelAccount } from '../../viewModels/account.viewModel';
import { AuthGuard } from '../../../../guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Account')
@Controller('account')
export class GetAccountByIdController {
  constructor(private readonly getAccountByIdUseCase: GetAccountByIdUseCase) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a bank account by ID' })
  @ApiResponse({
    status: 200,
    description: 'Account found.',
    schema: {
      example: {
        id: '11cd6603-01d8-4d90-a800-3cc0a7df0851',
        name: 'Account 01',
        type: 'CURRENT',
        balance: 1000,
        createdAt: '2024-06-30T22:59:46.606Z',
        payments: [],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Account not found.',
    schema: {
      example: {
        message: 'Account not found',
        error: 'NotFoundException',
        statusCode: 404,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'GET /account',
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
        path: 'GET /account',
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
        path: 'GET /account',
      },
    },
  })
  @ApiQuery({ name: 'id', required: true, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  async execute(
    @Query('id') id: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    const account = await this.getAccountByIdUseCase.execute(
      id,
      startDate,
      endDate,
    );
    return viewModelAccount.toHttp(account);
  }
}
