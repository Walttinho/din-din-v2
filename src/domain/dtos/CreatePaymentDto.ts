import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '12018f9b-4859-4e21-a0f1-45f990fa99c7',
    description: 'The ID of the account',
  })
  accountId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 214, description: 'The amount of the payment' })
  amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'some description',
    description: 'The description of the payment',
  })
  description: string;
}
