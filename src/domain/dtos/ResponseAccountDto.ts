export class ResponseAccountDto {
  id: string;
  name: string;
  type: string;
  balance: number;
  createdAt: Date;

  constructor(partial: Partial<ResponseAccountDto>) {
    Object.assign(this, partial);
  }
}
