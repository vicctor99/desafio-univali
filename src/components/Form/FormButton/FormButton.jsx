import PropTypes from "prop-types";

export default function FormButton({ children, btnDanger, onClick }) {
  return (
    <button
      className={`py-2 ${
        btnDanger ? "bg-red-500 hover:bg-red-600" : ""
      } bg-blue-500 hover:bg-blue-600 text-white rounded-md w-28 font-medium cursor-pointer transition-colors `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Definindo PropTypes
FormButton.propTypes = {
  children: PropTypes.node.isRequired,
  btnDanger: PropTypes.bool,
  onClick: PropTypes.func,
};
