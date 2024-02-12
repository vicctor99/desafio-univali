import PropTypes from "prop-types";
import TableData from "./TableData/TableData";
import TableBody from "./TableBody/TableBody";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";
import Thead from "./Thead/Thead";
import TableContainerButton from "./TableButton/TableContainerButton";
import TableButton from "./TableButton/TableButton";

export default function TableContainer({ children }) {
  return (
    <table className="text-center border-collapse border border-slate-200 w-full overflow-auto">
      {children}
    </table>
  );
}

TableContainer.Container = TableContainer;
TableContainer.Th = TableHeader;
TableContainer.Td = TableData;
TableContainer.Tr = TableRow;
TableContainer.Thead = Thead;
TableContainer.Tbody = TableBody;
TableContainer.ButtonContainer = TableContainerButton;
TableContainer.Button = TableButton;

// Definindo PropTypes
TableContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
