import { BaseEntity } from "./base";
import { Card } from "./card";

export class Transaction extends BaseEntity {
  transactionDate: string;

  constructor(public senderCard: Card, public receivedCard: Card, public amount: number, public senderName: string, public receivedName: string) {
    super();

    if (senderCard.balance < amount) throw new Error(`${senderCard.cardNumber} not Enough Money`);
    senderCard.balance -= amount;
    receivedCard.balance += amount;
    let now = new Date();

    this.transactionDate = `${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}/${+now.getMonth() + 1 < 10 ? `0${+now.getMonth() + 1}` : +now.getMonth() + 1}/${now.getFullYear()} ${
      now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()
    }:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}:${now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()}`;
  }
}
