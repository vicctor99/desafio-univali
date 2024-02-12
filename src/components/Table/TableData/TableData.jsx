import PropTypes from "prop-types";

export default function TableData({ children }) {
  return (
    <td className=" border-slate-200 border-y py-5 capitalize font-medium text-gray-700 text-xs md:text-base lg:text-lg border text-nowrap">
      {children}
    </td>
  );
}

// Definindo PropTypes
TableData.propTypes = {
  children: PropTypes.node,
};
