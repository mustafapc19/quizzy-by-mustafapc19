import * as yup from "yup";

const CREATE_QUIZ_VALIDATION = yup.object({
  name: yup.string().trim().required("Name is required"),
});

const CREATE_QUIZ_FORM_INITIAL_VALUE = {
  name: "",
};

export { CREATE_QUIZ_VALIDATION, CREATE_QUIZ_FORM_INITIAL_VALUE };
