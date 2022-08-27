import { v4 as uuid } from 'uuid';

//representacao do Dominio
export class BankAccount {
  balance: number;
  account_number: string;
  id: string;

  constructor(balance: number, account_number: string, id?: string) {
    this.id = id ?? uuid();
    this.balance = balance;
    this.account_number = account_number;
  }
  debit(amount: number) {
    this.balance -= amount;
  }
  credit(amount: number) {
    this.balance += amount;
  }
  //criar
  //depositar
  //creditar
}

type BankAccountProps = {
  balance: number;
  account_number: string;
};
//representacao do Dominio

//DDD - Soluciona e ajuda a complexidade do coração do sistema
//
// export class BankAccount {
//   id: string;

//   constructor(public readonly props: BankAccountProps, id?: string) {
//     this.id = id ?? uuid();
//   }
//   debit(amount: number) {
//     this.props.balance -= amount;
//   }
//   credit(amount: number) {
//     this.props.balance += amount;
//   }

//   get balance(): number {
//     return this.props.balance;
//   }
//   private set balance(value: number) {
//     this.props.balance = value;
//   }

//   get account_number(): string {
//     return this.props.account_number;
//   }
//   private set account_number(value: string) {
//     this.props.account_number = value;
//   }
