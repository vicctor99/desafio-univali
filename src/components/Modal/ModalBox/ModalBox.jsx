import PropTypes from "prop-types";

export default function ModalBox({ children }) {
  return (
    <div
      className={`bg-white rounded-md shadow p-6 transition-all flex flex-col items-center text-center`}
    >
      {children}
    </div>
  );
}

// Definindo PropTypes
ModalBox.propTypes = {
  children: PropTypes.node.isRequired,
};
