import { Inject, Injectable, Scope } from '@nestjs/common';
import { getDataSourceToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccount } from './entities/bank-account.entity';

@Injectable({
  scope: Scope.REQUEST,
  durable: true,
})
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private repo: Repository<BankAccount>,
    @Inject(getDataSourceToken())
    private dataSource: DataSource,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = this.repo.create({
      account_number: createBankAccountDto.account_number,
      balance: 0,
    });

    await this.repo.insert(bankAccount);
    return bankAccount;
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async transfer(from: string, to: string, amount: number) {
    const fromAccount = await this.repo.findOneBy({ account_number: from });
    const toAccount = await this.repo.findOneBy({ account_number: to });
    console.log(fromAccount, toAccount);
    fromAccount.balance -= amount;
    toAccount.balance += amount;

    this.repo.save(fromAccount);
    this.repo.save(toAccount);
  }

  transferTransactionManager(from: string, to: string, amount: number) {
    this.repo.manager.transaction(async (manager) => {
      const fromAccount = await this.repo.findOneBy({ account_number: from });
      const toAccount = await this.repo.findOneBy({ account_number: to });
      fromAccount.balance -= amount;
      toAccount.balance += amount;

      console.log(fromAccount.balance, toAccount.balance);
      manager.save(fromAccount);
      manager.save(toAccount);
    });
  }

  async transferQueryRunner(from: string, to: string, amount: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      const fromAccount = await this.repo.findOneBy({ account_number: from });
      const toAccount = await this.repo.findOneBy({ account_number: to });
      console.log(fromAccount, toAccount);
      fromAccount.balance -= amount;
      toAccount.balance += amount;

      this.repo.save(fromAccount);
      this.repo.save(toAccount);
      queryRunner.commitTransaction();
    } catch (e) {
      queryRunner.rollbackTransaction();
      console.log(e);
      throw e;
    }
  }

  // update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
  //   return `This action updates a #${id} bankAccount`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} bankAccount`;
  // }
}
