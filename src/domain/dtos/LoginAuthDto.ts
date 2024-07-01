import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'The password of the user',
  })
  password: string;
}
