import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetUserByEmailUseCase } from '../../usecase/GetUserByEmailUseCase/GetUserByEmailUseCase';
import { AuthGuard } from '../../../../guards/auth.guard';

@Controller('user')
export class GetUserByEmailController {
  constructor(private readonly getUserByEmailUseCase: GetUserByEmailUseCase) {}

  @UseGuards(AuthGuard)
  @Get()
  async execute(@Query('email') email: string) {
    const user = await this.getUserByEmailUseCase.execute(email);

    return user;
  }
}
