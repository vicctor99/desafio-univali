import PropTypes from "prop-types";

export default function FormInput({
  type,
  placeholder,
  value,
  id,
  onChange,
  maxLength,
  disabled,
  error,
  onKeyDown,
}) {
  return (
    <input
      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      } ${error ? "border-red-500" : ""}`}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      disabled={disabled ? true : false}
      onKeyDown={onKeyDown}
    />
  );
}

// Definindo PropTypes
FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  error: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onKeyDown: PropTypes.func,
};
