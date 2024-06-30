import { Controller, UseGuards } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreatePaymentDto } from '../../../../domain/dtos/CreatePaymentDto';
import { CreatePaymentUseCase } from '../../useCase/CreatePaymentUseCase/CreatePaymentUseCase';
import { AuthGuard } from '../../../../guards/auth.guard';

@Controller('payment')
export class CreatePaymentController {
  constructor(private readonly createPaymentUseCase: CreatePaymentUseCase) {}

  @UseGuards(AuthGuard)
  @Post()
  async execute(@Body() createPaymentDto: CreatePaymentDto) {
    const result = await this.createPaymentUseCase.execute(createPaymentDto);
    return result;
  }
}
