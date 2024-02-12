import PropTypes from "prop-types";

export default function ButtonContainer({ children }) {
  return (
    <div className="flex items-center justify-end md:justify-end gap-4 border-t border-gray-300 w-full pt-3 pb-6 md:pb-0">
      {children}
    </div>
  );
}

// Definindo PropTypes
ButtonContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
