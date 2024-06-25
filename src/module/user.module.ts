import { Module } from '@nestjs/common';
import { CreateUserController } from 'src/application/user/controller/CreateUserController/CreateUserController';
import { CreateUserUseCase } from 'src/application/user/usecase/CreateUserUseCase/CreateUserUseCase';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
