import * as yup from "yup";

const FORM_VALIDATION = yup.object({
  name: yup.string().trim().required("Name is required"),
});

const FORM_INITIAL_VALUE = {
  name: "",
};

export { FORM_VALIDATION, FORM_INITIAL_VALUE };
