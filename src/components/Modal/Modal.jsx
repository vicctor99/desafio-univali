import PropTypes from "prop-types";
import ModalBox from "./ModalBox/ModalBox";
import ModalTitle from "./ModalTitle/ModalTitle";
import ModalText from "./ModalText/ModalText";
import ModalIcon from "./ModalIcon/ModalIcon";
import ModalButtonContainer from "./ModalButton/ModalButtonContainer";
import ModalButton from "./ModalButton/ModalButton";
import { TiDeleteOutline } from "react-icons/ti";

export default function Modal({ isVisible }) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-all bg-black/20 scale-100 opacity-100 ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      <Modal.Box>
        <Modal.Icon>
          <TiDeleteOutline className="w-20 h-20" />
        </Modal.Icon>
        <Modal.Title>Você tem certeza?</Modal.Title>
        <Modal.Text>Esse processo não pode ser desfeito</Modal.Text>
        <Modal.ButtonContainer isAction>
          <Modal.Button btnDanger>Deletar</Modal.Button>
          <Modal.Button>Cancelar</Modal.Button>
        </Modal.ButtonContainer>
      </Modal.Box>
    </div>
  );
}

Modal.Container = Modal;
Modal.Box = ModalBox;
Modal.Icon = ModalIcon;
Modal.Title = ModalTitle;
Modal.Text = ModalText;
Modal.ButtonContainer = ModalButtonContainer;
Modal.Button = ModalButton;

// Definindo PropTypes
Modal.propTypes = {
  open: PropTypes.string,
  isVisible: PropTypes.bool,
};
