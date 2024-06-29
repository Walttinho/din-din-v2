import { Controller, Get, Query } from '@nestjs/common';
import { GetAccountByIdUseCase } from '../../usecase/GetAccountByIdUseCase/GetAccountByIdUseCase';
import { viewModelAccount } from '../../viewModels/account.viewModel';


@Controller('account')
export class GetAccountByIdController {
  constructor(private readonly getAccountByIdUseCase: GetAccountByIdUseCase) {}

  @Get()
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
