import { Inject, Injectable } from '@nestjs/common';
import { PrismaAccountRepository } from '../../../../infrastructure/database/prisma/repository/prisma.account.repository';
import { CreateAccountDto } from '../../../../domain/dtos/CreateAccountDto';
import { Account } from '../../../../domain/entities/Account';
import { AccountRepository } from '../../../../domain/repositories/account.repository';
import { ResponseAccountDto } from '../../../../domain/dtos/ResponseAccountDto';
import { PrismaAccountMapper } from '../../../../infrastructure/database/prisma/mappers/prisma.account.mapper';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @Inject(PrismaAccountRepository)
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(accountDto: CreateAccountDto): Promise<ResponseAccountDto> {
    const { name, type, balance } = accountDto;

    const account = new Account({
      name,
      type,
      balance,
      createdAt: new Date(),
    });

    const result = await this.accountRepository.create(account);

    return PrismaAccountMapper.toPrisma(result);
  }
}
