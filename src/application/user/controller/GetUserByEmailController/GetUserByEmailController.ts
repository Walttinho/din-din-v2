import { Controller, Get, Query } from '@nestjs/common';
import { GetUserByEmailUseCase } from '../../usecase/GetUserByEmailUseCase/GetUserByEmailUseCase';

@Controller('user')
export class GetUserByEmailController {
  constructor(private readonly getUserByEmailUseCase: GetUserByEmailUseCase) {}

  @Get()
  async execute(@Query('email') email: string) {
    const user = await this.getUserByEmailUseCase.execute(email);

    return user;
  }
}
