import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Payment } from '../../../../domain/entities/Payment';
import { PrismaPaymentMapper } from '../mappers/prisma.payment.mapper';
import { PaymentRepository } from '../../../../domain/repositories/payment.repository';

@Injectable()
export class PrismaPaymentRepository extends PaymentRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(payment: Payment): Promise<Payment> {
    const paymentRaw = PrismaPaymentMapper.toPrisma(payment);
    const createdPayment = await this.prisma.payment.create({
      data: paymentRaw,
    });
    return PrismaPaymentMapper.toDomain(createdPayment);
  }

  async findById(id: string): Promise<Payment> {
    const paymentRaw = await this.prisma.payment.findUnique({
      where: { id },
    });
    if (!paymentRaw) return null;
    return PrismaPaymentMapper.toDomain(paymentRaw);
  }
}
