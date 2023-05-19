import { BaseEntity } from "./base";

export type CARD_TYPE = "UZCARD" | "HUMO"; // EnamType

export class Card extends BaseEntity {
  constructor(
    public cardNumber: string,
    public pin: number,
    public expiry: string,
    public type: CARD_TYPE,
    public balance: number,
    // public ownerId: number,
    public ownerPhoneNumber: string,
    public bankName: string
  ) {
    super();
  }
}
