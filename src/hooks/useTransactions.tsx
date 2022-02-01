import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
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

    const formattedTransaction: TransactionProps = {
      ...transaction,
      amount: formatCurrency(transaction.amount),
      createdAt: formatDate(transaction.createdAt),
    };

    setTransactions([...transactions, formattedTransaction]);
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
  }

  useEffect(() => {
    api.get("transactions").then((response) => {
      const formattedTrasactions = response.data.transactions.map(
        (transaction: TransactionProps) => ({
          ...transaction,
          amount: formatCurrency(transaction.amount),
          createdAt: formatDate(transaction.createdAt),
        })
      );

      setTransactions(formattedTrasactions);
    });
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions () {
  const context = useContext(TransactionsContext);

  return context;
}
