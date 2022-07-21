import { useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import {
  filterListByMonth,
  formatCurrency,
  formatDate,
  getCurrentMonth,
} from "../../utils";
import { TransactionProps } from "../../interfaces";
import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();

  const [transactionsFiltred, setTransactionsFiltred] =
    useState<TransactionProps[]>(transactions);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  useEffect(() => {
    const filtredListTransactions = filterListByMonth(
      transactions,
      currentMonth
    );
    setTransactionsFiltred(filtredListTransactions);
  }, [transactions, currentMonth]);

  return (
    <Container>
      {transactionsFiltred.length > 0 ? (
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
            {transactionsFiltred.map(
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
      ) : (
        <p>Nenhuma transação encontrada</p>
      )}
    </Container>
  );
}
