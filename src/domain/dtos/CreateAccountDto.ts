import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Account 01',
    description: 'The name of the account',
  })
  name: string;

  @IsNotEmpty()
  @IsEnum(AccountType)
  @ApiProperty({ example: 'CURRENT', description: 'The type of the account' })
  type: AccountType;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    example: 1000,
    description: 'The initial balance of the account',
  })
  balance: number;
}
