import { useEffect, useState, useContext } from "react";

import { api } from "../../services/api";
import { TransactionsContext } from "../../contexts/TransactionsContexts";

import { Container } from "./styles";

interface TransactionProps {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

export function TransactionsTable() {
  const data = useContext(TransactionsContext);
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
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(
            ({
              id,
              title,
              type,
              amount,
              category,
              createdAt,
            }: TransactionProps) => (
              <tr key={id}>
                <td>{title}</td>
                <td className={type}>{formatCurrency(amount)}</td>
                <td>{category}</td>
                <td>{formatDate(createdAt)}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Container>
  );
}
