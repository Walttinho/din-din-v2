import { Inject, Injectable } from '@nestjs/common';
import { PrismaAccountRepository } from '../../../../infrastructure/database/prisma/repository/prisma.account.repository';
import { CreateAccountDto } from '../../../../domain/dtos/CreateAccountDto';
import { Account } from '../../../../domain/entities/Account';
import { AccountRepository } from '../../../../domain/repositories/account.repository';
import { ResponseAccountDto } from '../../../../domain/dtos/ResponseAccountDto';

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

    await this.accountRepository.create(account);
    const responseAccountDTO = new ResponseAccountDto({
      id: account.id,
      name: account.name,
      type: account.type,
      balance: account.balance,
      createdAt: account.createdAt,
    });

    return responseAccountDTO;
  }
}
