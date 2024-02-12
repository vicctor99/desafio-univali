import PropTypes from "prop-types";

export default function TableContainerButton({ children }) {
  return (
    <div className="flex items-center justify-center gap-2">{children}</div>
  );
}

// Definindo PropTypes
TableContainerButton.propTypes = {
  children: PropTypes.node.isRequired,
};
