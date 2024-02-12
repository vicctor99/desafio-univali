import PropTypes from "prop-types";

export default function FormCheckbox({ children }) {
  return <div className="flex items-center space-x-4 py-2">{children}</div>;
}

// Definindo PropTypes
FormCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
};
