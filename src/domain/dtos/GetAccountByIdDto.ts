import { IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';

export class GetAccountByIdDto {
  @IsUUID()
  @IsString()
  id: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
