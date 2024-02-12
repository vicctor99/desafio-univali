import PropTypes from "prop-types";

export default function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

// Definindo PropTypes
TableBody.propTypes = {
  children: PropTypes.node.isRequired,
};
