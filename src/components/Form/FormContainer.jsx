import PropTypes from "prop-types";
import FormFieldContainer from "./FieldContainer/FormFieldContainer";
import FormLabel from "./FormLabel/FormLabel";
import FormInput from "./FormInput/FormInput";
import FormSelectContainer from "./FormSelect/FormSelectContainer";
import FormSelectOption from "./FormSelect/FormSelectOption";
import FormCheckbox from "./FormCheckbox/FormCheckbox";
import FormCheckboxOption from "./FormCheckbox/FormCheckboxOption";
import FormButton from "./FormButton/FormButton";
import ButtonContainer from "./FormButton/ButtonContainer";

export default function FormContainer({ children, onSubmit }) {
  return (
    <form
      className="flex flex-col flex-grow md:gap-x-12 gap-y-6"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

FormContainer.Container = FormContainer;
FormContainer.FieldContainer = FormFieldContainer;
FormContainer.Label = FormLabel;
FormContainer.Input = FormInput;
FormContainer.Select = FormSelectContainer;
FormContainer.Option = FormSelectOption;
FormContainer.Checkbox = FormCheckbox;
FormContainer.CheckboxOption = FormCheckboxOption;
FormContainer.ButtonContainer = ButtonContainer;
FormContainer.Button = FormButton;

// Definindo PropTypes
FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
