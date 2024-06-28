import { Controller, Get, Query } from '@nestjs/common';
import { GetAccountByIdUseCase } from '../../usecase/GetAccountByIdUseCase/GetAccountByIdUseCase';

@Controller('account')
export class GetAccountByIdController {
  constructor(private readonly getAccountByIdUseCase: GetAccountByIdUseCase) {}

  @Get()
  async execute(@Query('id') id: string) {
    const account = await this.getAccountByIdUseCase.execute(id);

    return account;
  }
}
