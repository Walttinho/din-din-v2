import {
  Module
} from '@nestjs/common';
import { DatabaseModule } from './module/database.module';
import { UserModule } from './module/user.module';
import { AccountModule } from './module/account.module';
import { PaymentModule } from './module/payment.module';
import { AuthModule } from './module/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AccountModule,
    PaymentModule,
    AuthModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}