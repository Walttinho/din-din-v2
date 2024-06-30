import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateAccountUseCase } from '../../usecase/CreateAccountUseCase/CreateAccountUseCase';
import { CreateAccountDto } from '../../../../domain/dtos/CreateAccountDto';
import { AuthGuard } from '../../../../guards/auth.guard';

@Controller('account')
export class CreateAccountController {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  @UseGuards(AuthGuard)
  @Post()
  async execute(@Body() createAccountDto: CreateAccountDto) {
    const result = await this.createAccountUseCase.execute(createAccountDto);
    return result;
  }
}
