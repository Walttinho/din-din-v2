import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { CreatePaymentDto } from '../../../../domain/dtos/CreatePaymentDto';
import { CreatePaymentUseCase } from '../../useCase/CreatePaymentUseCase/CreatePaymentUseCase';
import { AuthGuard } from '../../../../guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class CreatePaymentController {
  constructor(private readonly createPaymentUseCase: CreatePaymentUseCase) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({ type: CreatePaymentDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({
    status: 201,
    description: 'Payment successfully created.',
    schema: {
      example: {
        id: '48800cf4-1ce6-4324-8318-1f436dd23c41',
        accountId: '11cd6603-01d8-4d90-a800-3cc0a7df0851',
        amount: 214,
        description: 'some description',
        createdAt: '2024-06-30T23:02:28.428Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: {
      example: {
        message: 'Invalid payment amount',
        error: 'BadRequestException',
        statusCode: 400,
        timestamp: '2024-07-01T06:30:12.114Z',
        path: 'POST /payment',
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
        path: 'POST /payment',
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
        path: 'POST /payment',
      },
    },
  })
  @ApiBody({ type: CreatePaymentDto })
  async execute(@Body() createPaymentDto: CreatePaymentDto) {
    const result = await this.createPaymentUseCase.execute(createPaymentDto);
    return result;
  }
}
