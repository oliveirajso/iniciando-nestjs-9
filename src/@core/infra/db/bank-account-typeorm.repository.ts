import { Repository } from 'typeorm';
import { BankAccountSchema } from './bank-account.schema';
import { BankAccount } from '../../domain/bank-account';
import { BankAccountRepository } from 'src/@core/domain/bank-account.repository';

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private ormRepo: Repository<BankAccountSchema>) {}
  async update(bankAccount: BankAccount): Promise<void> {
    this.ormRepo.update(bankAccount.id, bankAccount);
  }

  async findByAccountNumber(account_number: string): Promise<BankAccount> {
    const model = await this.ormRepo.findOneBy({
      account_number: account_number,
    });
    return new BankAccount(model.balance, model.account_number, model.id);
  }
  async all(): Promise<BankAccountSchema[]> {
    return await this.ormRepo.find();
  }

  async insert(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepo.create(bankAccount);
    await this.ormRepo.insert(model);
  }
}
//Repositório
//Repositório DDD camada para lidar com as entidades em Si. Lida com a representação da Entidade
