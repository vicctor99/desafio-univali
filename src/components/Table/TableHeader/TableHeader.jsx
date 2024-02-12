import PropTypes from "prop-types";

export default function TableHeader({ children }) {
  return (
    <th className="py-4 bg-slate-300/70 text-slate-800 uppercase text-[9px] md:text-xs font-medium">
      {children}
    </th>
  );
}

// Definindo PropTypes
TableHeader.propTypes = {
  children: PropTypes.string,
};
