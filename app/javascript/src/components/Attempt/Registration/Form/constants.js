import * as yup from "yup";

const FORM_INITIAL_VALUES = {
  email: "",
  firstName: "",
  lastName: "",
};

const FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
});
export { FORM_INITIAL_VALUES, FORM_VALIDATION_SCHEMA };
