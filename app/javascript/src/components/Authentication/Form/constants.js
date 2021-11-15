import * as yup from "yup";

const FORM_INITIAL_VALUES = {
  email: "",
  password: "",
};

const FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});
export { FORM_INITIAL_VALUES, FORM_VALIDATION_SCHEMA };
