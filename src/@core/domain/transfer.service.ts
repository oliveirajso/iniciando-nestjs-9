import { BankAccount } from './bank-account';

export class TransferService {
  /**
   * Transfere o valor informado da conta de origem para conta de destino
   * @param bankAccountOrig
   * @param bankAccountDest
   * @param amount
   */
  async transfer(
    bankAccountOrig: BankAccount,
    bankAccountDest: BankAccount,
    amount: number,
  ) {
    bankAccountOrig.debit(amount);
    bankAccountDest.credit(amount);
  }
}
