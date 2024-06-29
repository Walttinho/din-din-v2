import { Payment } from '../../../domain/entities/Payment';
export class viewModelPayment {
  static toHttp({ id, accountId, amount, description, createdAt }: Payment) {
    return {
      id,
      accountId,
      amount,
      description,
      createdAt,
    };
  }
}
