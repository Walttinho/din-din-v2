import { Module } from '@nestjs/common';
import { DatabaseModule } from './module/database.module';
import { UserModule } from './module/user.module';
import { AccountModule } from './module/account.module';

@Module({
  imports: [DatabaseModule, UserModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
