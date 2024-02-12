import PropTypes from "prop-types";

export default function ModalButtonContainer({ children, isAction }) {
  return (
    <div
      className={` ${
        isAction
          ? "flex items-center justify-center gap-4 border-t border-gray-300 w-full pt-3 mt-4"
          : ""
      }`}
    >
      {children}
    </div>
  );
}

// Definindo PropTypes
ModalButtonContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isAction: PropTypes.bool,
};
