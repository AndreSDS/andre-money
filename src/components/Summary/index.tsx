import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils";
import incomeImg from "../../assets/entradas.svg";
import outcomeImg from "../../assets/saidas.svg";
import totalImg from "../../assets/total.svg";

import { Container } from "./styles";
import { useEffect } from "react";

export function Summary() {
  const { transactions, getAllTransactions } = useTransactions();

  const summary = transactions?.reduce(
    (accumulator, transaction) => {
      if (transaction.type === "deposit") {
        accumulator.deposit += transaction.amount;
        accumulator.total += transaction.amount;
      } else {
        accumulator.withdraw += transaction.amount;
        accumulator.total -= transaction.amount;
      }

      return accumulator;
    },
    {
      deposit: 0,
      withdraw: 0,
      total: 0,
    }
  );

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="entradas" />
        </header>
        <strong>{formatCurrency(summary.deposit)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="saídas" />
        </header>
        <strong>{formatCurrency(summary.withdraw)}</strong>
      </div>
      <div className="highlight">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>{formatCurrency(summary.total)}</strong>
      </div>
    </Container>
  );
}
