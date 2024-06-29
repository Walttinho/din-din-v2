export interface IPayment {
  id?: string;
  accountId: string;
  amount: number;
  description: string;
  createdAt: Date;
}
