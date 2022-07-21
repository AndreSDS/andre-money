import logImg from "../../assets/logo.svg";

import { Container, Content, Button } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logImg} alt="logo andré money" />
        <Button onClick={onOpenNewTransactionModal} type="button">
          Nova transação
        </Button>
      </Content>
    </Container>
  );
}
