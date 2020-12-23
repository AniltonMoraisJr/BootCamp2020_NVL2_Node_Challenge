import { Router, Response, Request} from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request: Request, response: Response) => {
  try {
    const listOfTransactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.status(200).json({transactions: listOfTransactions, balance});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const {title, value, type} = request.body;
  try {
    const createTransactionService = new CreateTransactionService(transactionsRepository);
    const transaction = createTransactionService.execute({
      title,
      value,
      type
    });
    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
