import { BaseEntity } from "./base.js";
export class Card extends BaseEntity {
  cardNumber;
  pin;
  expiry;
  type;
  balance;
  ownerId;
  ownerPhoneNumber;
  bankName;
  constructor(cardNumber, pin, expiry, type, balance, ownerId, ownerPhoneNumber, bankName) {
    super();
    this.cardNumber = cardNumber;
    this.pin = pin;
    this.expiry = expiry;
    this.type = type;
    this.balance = balance;
    this.ownerId = ownerId;
    this.ownerPhoneNumber = ownerPhoneNumber;
    this.bankName = bankName;
  }
}
