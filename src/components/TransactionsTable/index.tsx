import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency, formatDate } from "../../utils";
import { TransactionProps } from "../../interfaces";
import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();

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
