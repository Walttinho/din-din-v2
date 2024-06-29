import { Payment } from '../entities/Payment';

export abstract class PaymentRepository {
  abstract create(account: Payment): Promise<Payment>;
  abstract findById(id: string): Promise<Payment>;
}
