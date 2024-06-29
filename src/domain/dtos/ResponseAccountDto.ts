import { ResponsePaymentDto } from './ResponsePaymentDto';

export class ResponseAccountDto {
  id: string;
  name: string;
  type: string;
  balance: number;
  createdAt: Date;
  payments?: ResponsePaymentDto[];

  constructor(partial: Partial<ResponseAccountDto>) {
    Object.assign(this, partial);
  }
}
