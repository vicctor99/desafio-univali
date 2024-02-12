import PropTypes from "prop-types";

export default function FormFieldContainer({ children }) {
  return <div className="flex flex-col">{children}</div>;
}

// Definindo PropTypes
FormFieldContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
