import { useState } from "react";
import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";
import incomeImg from "../../assets/entradas.svg";

import { Container, MonthArea } from "./styles";

export function Dashboard() {
  const [month, setMonth] = useState(new Date());

  return (
    <Container>
      <Summary />
      <MonthArea>
        <img src={incomeImg} alt="entradas" />
        <p>Janeiro</p>
        <img src={incomeImg} alt="entradas" />
      </MonthArea>
      <TransactionsTable />
    </Container>
  );
}
