import PropTypes from "prop-types";

export default function TableButton({ children, onClick, btnDanger }) {
  return (
    <input
      className={`py-2 ${
        btnDanger ? "bg-red-500 hover:bg-red-400" : ""
      } bg-blue-500 hover:bg-blue-400 text-white rounded-md w-28 font-semibold cursor-pointer transition-colors `}
      onClick={onClick}
    >
      {children}
    </input>
  );
}

// Definindo PropTypes
TableButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  btnDanger: PropTypes.bool,
};
