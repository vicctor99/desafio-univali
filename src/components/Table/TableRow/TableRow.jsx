import PropTypes from "prop-types";

export default function TableRow({ children }) {
  return (
    <tr className="transition-all hover:bg-gray-200 overflow-auto">
      {children}
    </tr>
  );
}

// Definindo PropTypes
TableRow.propTypes = {
  children: PropTypes.node.isRequired,
};
