import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '../../../../domain/repositories/account.repository';
import { PrismaAccountRepository } from '../../../../infrastructure/database/prisma/repository/prisma.account.repository';
import { ResponseAccountDto } from '../../../../domain/dtos/ResponseAccountDto';

@Injectable()
export class GetAccountByIdUseCase {
  constructor(
    @Inject(PrismaAccountRepository)
    private accountRepository: AccountRepository,
  ) {}

  async execute(
    id: string,
    startDate: Date,
    endDate: Date,
  ): Promise<ResponseAccountDto> {
    const account = await this.accountRepository.findById(
      id,
      startDate,
      endDate,
    );

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    return account;
  }
}
