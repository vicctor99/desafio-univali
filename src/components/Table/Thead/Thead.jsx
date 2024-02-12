import PropTypes from "prop-types";

export default function Thead({ children }) {
  return <thead>{children}</thead>;
}

// Definindo PropTypes
Thead.propTypes = {
  children: PropTypes.node.isRequired,
};
