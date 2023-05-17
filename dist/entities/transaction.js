import { BaseEntity } from "./base.js";
export class Transaction extends BaseEntity {
  senderCard;
  receivedCard;
  amount;
  senderName;
  receivedName;
  transactionDate;
  constructor(senderCard, receivedCard, amount, senderName, receivedName) {
    super();
    this.senderCard = senderCard;
    this.receivedCard = receivedCard;
    this.amount = amount;
    this.senderName = senderName;
    this.receivedName = receivedName;
    if (senderCard.balance < amount) throw new Error(`${senderCard.cardNumber} not Enough Money`);
    senderCard.balance -= amount;
    receivedCard.balance += amount;
    let now = new Date();
    this.transactionDate = `${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}/${+now.getMonth() + 1 < 10 ? `0${+now.getMonth() + 1}` : +now.getMonth() + 1}/${now.getFullYear()} ${
      now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()
    }:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}:${now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()}`;
  }
}
