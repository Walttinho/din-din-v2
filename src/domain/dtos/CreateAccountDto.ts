import { AccountType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(AccountType)
  type: AccountType;

  @IsNotEmpty()
  @IsPositive()
  balance: number;
}
