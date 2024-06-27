import { Module } from '@nestjs/common';
import { DatabaseModule } from './module/database.module';
import { UserModule } from './module/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
