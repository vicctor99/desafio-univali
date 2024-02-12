import PropTypes from "prop-types";

export default function ModalButton({ children, btnDanger, onClick }) {
  return (
    <button
      className={`py-2 ${
        btnDanger
          ? "bg-rose-500 hover:bg-rose-400"
          : " bg-gray-400/70 hover:bg-gray-400"
      } text-white rounded-md w-28 font-semibold cursor-pointer transition-colors `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Definindo PropTypes
ModalButton.propTypes = {
  children: PropTypes.node.isRequired,
  btnDanger: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
