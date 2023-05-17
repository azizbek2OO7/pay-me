export class TransactionRepository {
    list = [];
    counterID = 0;
    add(...transactions) {
        for (let transaction of transactions) {
            transaction.setId(++this.counterID);
            this.list.push(transaction);
        }
    }
    getList() {
        return this.list;
    }
    getTransactionByID(transactionID) {
        for (let transaction of this.list) {
            if (transaction.getId() === transactionID)
                return transaction;
        }
        throw new Error(`❌ Transaction(${transactionID}) not found`);
    }
    getTransactionsByCardNumber(cardNumber) {
        const transactions = this.list.filter((transaction) => transaction.senderCard.cardNumber === cardNumber || transaction.receivedCard.cardNumber === cardNumber);
        if (!transactions.length)
            throw new Error(`❌ Transactions(${cardNumber}) not found`);
        return transactions;
    }
    getResult() {
        for (let transaction of this.list) {
            console.log(`${transaction.amount} was transferred from ${transaction.senderName}'s card(${transaction.senderCard.cardNumber}) to ${transaction.receivedName}'s card(${transaction.receivedCard.cardNumber}) on ${transaction.transactionDate} ✅`);
        }
    }
}
