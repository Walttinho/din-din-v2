import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreatePaymentDto } from '../../../../domain/dtos/CreatePaymentDto';
import { CreatePaymentUseCase } from '../../useCase/CreatePaymentUseCase/CreatePaymentUseCase';

@Controller('payment')
export class CreatePaymentController {
  constructor(private readonly createPaymentUseCase: CreatePaymentUseCase) {}

  @Post()
  async execute(@Body() createPaymentDto: CreatePaymentDto) {
    const result = await this.createPaymentUseCase.execute(createPaymentDto);
    return result;
  }
}