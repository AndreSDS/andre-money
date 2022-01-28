import logImg from "../../assets/logo.svg";

import { Container, Content, Button } from "./styles";

export function Header() {
  return (
    <Container>
      <Content>
        <img src={logImg} alt="logo andré money" />
        <Button type="button">Nova transação</Button>
      </Content>
    </Container>
  );
}
