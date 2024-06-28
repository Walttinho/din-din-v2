import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../../../domain/repositories/account.repository';
import { PrismaService } from '../prisma.service';
import { Account } from 'src/domain/entities/Account';
import { PrismaAccountMapper } from '../mappers/prisma.account.mapper';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prisma: PrismaService) {}

  async create(account: Account): Promise<Account> {
    const accountRaw = PrismaAccountMapper.toPrisma(account);
    const createdAccount = await this.prisma.account.create({
      data: accountRaw,
    });
    return PrismaAccountMapper.toDomain(createdAccount);
  }

  async findById(id: string): Promise<Account> {
    const accountRaw = await this.prisma.account.findUnique({
      where: { id },
    });
    if (!accountRaw) {
      throw new Error('Account not found');
    }
    return PrismaAccountMapper.toDomain(accountRaw);
  }
}
