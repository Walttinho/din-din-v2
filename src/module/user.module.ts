import { Module } from '@nestjs/common';
import { CreateUserController } from 'src/application/user/controller/CreateUserController/CreateUserController';
import { CreateUserUseCase } from 'src/application/user/usecase/CreateUserUseCase/CreateUserUseCase';
import { DatabaseModule } from './database.module';
import { GetUserByEmailController } from 'src/application/user/controller/GetUserByEmailController/GetUserByEmailController';
import { GetUserByEmailUseCase } from 'src/application/user/usecase/GetUserByEmailUseCase/GetUserByEmailUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, GetUserByEmailController],
  providers: [CreateUserUseCase, GetUserByEmailUseCase],
})
export class UserModule {}
