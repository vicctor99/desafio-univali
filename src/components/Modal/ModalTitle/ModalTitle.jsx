import PropTypes from "prop-types";

export default function ModalTitle({ children }) {
  return <h2 className="text-3xl text-gray-600 mb-2">{children}</h2>;
}

// Definindo PropTypes
ModalTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
