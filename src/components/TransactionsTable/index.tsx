import {useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContexts";

import { Container } from "./styles";
import { TransactionProps } from "../../interfaces";

export function TransactionsTable() {
  const transactions = useContext(TransactionsContext);

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
                <td className={type}>{amount}</td>
                <td>{category}</td>
                <td>{createdAt}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Container>
  );
}
