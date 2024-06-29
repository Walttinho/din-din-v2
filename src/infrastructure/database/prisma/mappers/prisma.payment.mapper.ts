import { Payment } from '../../../../domain/entities/Payment';
import { Payment as PaymentRaw } from '@prisma/client';
export class PrismaPaymentMapper {
  static toPrisma(payment: Payment): PaymentRaw {
    return {
      id: payment.id,
      accountId: payment.accountId,
      amount: payment.amount,
      description: payment.description,
      createdAt: payment.createdAt,
    };
  }

  static toDomain(paymentRaw: PaymentRaw): Payment {
    return new Payment(
      {
        accountId: paymentRaw.accountId,
        amount: paymentRaw.amount,
        description: paymentRaw.description,
        createdAt: paymentRaw.createdAt,
      },
      paymentRaw.id,
    );
  }
}
