import { api } from "../services/api";
import { TransactionProps, TransactionInput } from "../interfaces";
import create from "zustand";

interface TransactionsContextProps {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  getAllTransactions: () => Promise<void>;
}

export const useTransactions = create<TransactionsContextProps>((set) => ({
  transactions: [],
  createTransaction: async (transactionInput) => {
    const response = await api.post("/transactions", transactionInput);
    const { transaction } = response.data;

    return set((store) => ({
      ...store,
      transactions: [...store.transactions, transaction],
    }));
  },
  getAllTransactions: async () => {
    const {
      data: { transactions },
    } = await api.get("/transactions");

    return set((store) => ({
      ...store,
      transactions: [...transactions],
    }));
  },
}));
