import PropTypes from "prop-types";

export default function FormSelectOption({ children, value, hidden }) {
  return (
    <option value={value} hidden={hidden}>
      {children}
    </option>
  );
}

// Definindo PropTypes
FormSelectOption.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  hidden: PropTypes.bool,
};
