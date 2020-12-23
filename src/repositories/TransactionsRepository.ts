import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.filter(t => t.type === 'income').reduce((total, t) =>  total + t.value, 0);
    const outcome = this.transactions.filter(t => t.type === 'outcome').reduce((total, t) =>  total + t.value, 0);
    const total = income - outcome;

    return {
      income,
      outcome,
      total
    };
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({title, value, type});
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
