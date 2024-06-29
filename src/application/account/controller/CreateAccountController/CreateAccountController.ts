import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountUseCase } from '../../usecase/CreateAccountUseCase/CreateAccountUseCase';
import { CreateAccountDto } from '../../../../domain/dtos/CreateAccountDto';

@Controller('account')
export class CreateAccountController {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  async execute(@Body() createAccountDto: CreateAccountDto) {
    const result = await this.createAccountUseCase.execute(createAccountDto);
    return result;
  }
}
