import { BankAccount } from './bank-account';
import { BankAccountRepository } from './bank-account.repository';
import { TransferService } from './transfer.service';

export class BankAccountService {
  //Application Service
  /**
   *
   * @param repository
   */
  constructor(private bankAccountRepo: BankAccountRepository) {}

  async create(account_number: string) {
    const bankAccount = new BankAccount(0, account_number);
    await this.bankAccountRepo.insert(bankAccount);
    return bankAccount;
  }
  async transfer(
    account_number_orig: string,
    account_number_dest: string,
    amount: number,
  ) {
    const bankAccountOrig = await this.bankAccountRepo.findByAccountNumber(
      account_number_orig,
    );
    const bankAccountDest = await this.bankAccountRepo.findByAccountNumber(
      account_number_dest,
    );

    const transferService = new TransferService();
    transferService.transfer(bankAccountOrig, bankAccountDest, amount);

    await this.bankAccountRepo.update(bankAccountOrig);
    await this.bankAccountRepo.update(bankAccountDest);
  }
  async findAll() {
    return this.findAll();
  }
}
