import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";
import { TransactionProps, TransactionInput } from "../interfaces";

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextProps {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", transactionInput);
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  useEffect(() => {
    api.get("transactions").then((response) => {
      setTransactions(response.data.transactions);
    });
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
