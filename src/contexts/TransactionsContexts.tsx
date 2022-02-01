import React, { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "../services/api";
import { TransactionProps } from "../interfaces";

export const TransactionsContext = createContext<TransactionProps[]>([]);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

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
      const formattedTransactions: TransactionProps[] =
        response.data.transactions.map((transaction: TransactionProps) => ({
          ...transaction,
          amount: formatCurrency(transaction.amount),
          createdAt: formatDate(transaction.createdAt),
        }));
      setTransactions(formattedTransactions);
    });
  }, []);

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
}
