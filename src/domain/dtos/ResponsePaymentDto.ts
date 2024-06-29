export class ResponsePaymentDto {
  id: string;
  accountId: string;
  amount: number;
  description: string;
  createdAt: Date;
  constructor(partial: Partial<ResponsePaymentDto>) {
    Object.assign(this, partial);
  }
}
