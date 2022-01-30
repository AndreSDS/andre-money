import Modal from "react-modal";
import closeImg from "../../assets/fechar.svg";
import { Container } from "./styles";

Modal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: ModalProps) {
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
      <Container>
        <h2>Cadastrar nova transação</h2>

        <input placeholder="Título" type="text" />

        <input placeholder="Valor" type="number" />

        <input placeholder="Categoria" type="text" />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}