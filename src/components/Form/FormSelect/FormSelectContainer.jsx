import PropTypes from "prop-types";

export default function FormSelectContainer({
  children,
  name,
  id,
  error,
  onChange,
}) {
  return (
    <select
      name={name}
      id={id}
      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
        error ? "border-red-500" : ""
      }`}
      onChange={onChange}
    >
      {children}
    </select>
  );
}

// Definindo PropTypes
FormSelectContainer.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
