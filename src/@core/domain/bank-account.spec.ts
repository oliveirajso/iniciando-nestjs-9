import { BankAccount } from './bank-account';

describe('Bank Account Unit Tests', () => {
  it('Should creat a bank account', () => {
    const bankAccount = new BankAccount(100, '123456', '123');
    expect(bankAccount.id).toBe('123');
    expect(bankAccount.balance).toBe(100);
    expect(bankAccount.account_number).toBe('123456');
  });

  it('should debit account', () => {
    const bankAccount = new BankAccount(100, '123456', '123');
    bankAccount.debit(50);
    expect(bankAccount.balance).toBe(50);
  });
  it('should credit account', () => {
    const bankAccount = new BankAccount(100, '123456', '123');
    bankAccount.credit(50);
    expect(bankAccount.balance).toBe(150);
  });
});
