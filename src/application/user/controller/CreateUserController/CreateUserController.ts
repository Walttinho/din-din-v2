import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../usecase/CreateUserUseCase/CreateUserUseCase';
import { CreateUserDto } from '../../../../domain/dtos/CreateUserDto';

@Controller('user')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async execute(@Body() createUserDto: CreateUserDto) {
    const result = await this.createUserUseCase.execute(createUserDto);
    return result;
  }
}
