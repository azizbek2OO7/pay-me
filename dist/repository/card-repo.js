export class CardRepository {
    list = [];
    counterID = 0;
    add(...newCards) {
        for (let newCard of newCards) {
            if (this.isExist(newCard.cardNumber)) {
                throw new Error(`❌ This card(${newCard.cardNumber}) already exist`);
            }
            newCard.setId(++this.counterID);
            this.list.push(newCard);
        }
    }
    isExist(cardNumber) {
        for (let card of this.list) {
            if (card.cardNumber === cardNumber)
                return true;
        }
        return false;
    }
    getList() {
        return this.list;
    }
    getCardByCardNumber(cardNumber) {
        const card = this.list.find((card) => card.cardNumber === cardNumber);
        if (!card)
            throw new Error(`❌ Card(${cardNumber}) not found`);
        return card;
    }
    getCardsByOwnerPhoneNumber(phoneNumber) {
        return this.list.filter((card) => card.ownerPhoneNumber === phoneNumber);
    }
}
