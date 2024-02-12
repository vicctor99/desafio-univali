import PropTypes from "prop-types";

export default function ModalText({ children }) {
  return <p className="text-lg text-gray-400">{children}</p>;
}

// Definindo PropTypes
ModalText.propTypes = {
  children: PropTypes.node.isRequired,
};
