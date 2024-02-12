import PropTypes from "prop-types";

export default function FormCheckboxOption({ value, id, checked, onChange }) {
  return (
    <input
      type="checkbox"
      id={id}
      value={value}
      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 p-2"
      checked={checked}
      onChange={onChange}
    />
  );
}

// Definindo PropTypes
FormCheckboxOption.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
