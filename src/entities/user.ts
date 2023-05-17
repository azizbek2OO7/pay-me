import { BaseEntity } from "./base";
import { Transaction } from "./transaction";

export class User extends BaseEntity {
  private transaction: Transaction[] = [];

  constructor(public firsName: string, public lastName: string, public phoneNumber: string, public passWord: string, public isBlocked: boolean = false) {
    super();
  }

  setTransaction(newTransaction: Transaction) {
    this.transaction.push(newTransaction);
  }

  getTransaction() {
    return this.transaction;
  }

  getFullName() {
    return `${this.firsName} ${this.lastName}`;
  }
}
