import { BaseEntity } from "./base.js";
export class User extends BaseEntity {
  firsName;
  lastName;
  phoneNumber;
  passWord;
  isBlocked;
  transaction = [];
  constructor(firsName, lastName, phoneNumber, passWord, isBlocked = false) {
    super();
    this.firsName = firsName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.passWord = passWord;
    this.isBlocked = isBlocked;
  }
  setTransaction(newTransaction) {
    this.transaction.push(newTransaction);
  }
  getTransaction() {
    return this.transaction;
  }
  getFullName() {
    return `${this.firsName} ${this.lastName}`;
  }
}
