import { FormEvent, useState } from "react";
import Modal from "react-modal";

import { api } from "../../services/api";

import closeImg from "../../assets/fechar.svg";
import incomeImg from "../../assets/entradas.svg";
import outcomeImg from "../../assets/saidas.svg";

import { Container, TransactionTypeContainer, TypeButton } from "./styles";

Modal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface FormValuesProps {
  title: string;
  value: number;
  category: string;
  type: string;
}

export function NewTransactionModal({ isOpen, onRequestClose }: ModalProps) {
  const [formValues, setFormValues] = useState<FormValuesProps>({
    title: "",
    value: 0,
    category: "",
    type: "",
  } as FormValuesProps);
  const { title, value, category, type } = formValues;

  function handleChange(event: FormEvent) {
    const { value, name } = event.target as HTMLInputElement;
    setFormValues({ ...formValues, [name]: value });
  }

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    api.post("/transactions", formValues);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-colse"
        type="button"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar nova transação</h2>

        <input
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Título"
          type="text"
        />

        <input
          name="value"
          value={value}
          onChange={handleChange}
          placeholder="Valor"
          type="number"
        />

        <TransactionTypeContainer>
          <TypeButton
            type="button"
            onClick={() => setFormValues({ ...formValues, type: "deposit" })}
            isActive={type === "deposit"}
            activeColor="#33CC95"
          >
            <img src={incomeImg} alt="entrada" />
            <span>Entrada</span>
          </TypeButton>

          <TypeButton
            type="button"
            onClick={() => setFormValues({ ...formValues, type: "withdraw" })}
            isActive={type === "withdraw"}
            activeColor="#E62E4D"
          >
            <img src={outcomeImg} alt="saída" />
            <span>Saída</span>
          </TypeButton>
        </TransactionTypeContainer>

        <input
          name="category"
          value={category}
          onChange={handleChange}
          placeholder="Categoria"
          type="text"
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
