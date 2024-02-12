import PropTypes from "prop-types";

export default function FormLabel({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[#493983] font-semibold after:content-['*'] after:ml-0.5 after:text-red-500"
    >
      {children}
    </label>
  );
}

// Definindo PropTypes
FormLabel.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
};
