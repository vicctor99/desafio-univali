import PropTypes from "prop-types";

export default function ModalIcon({ children }) {
  return <div className="text-md text-rose-400">{children}</div>;
}

// Definindo PropTypes
ModalIcon.propTypes = {
  children: PropTypes.node.isRequired,
};
