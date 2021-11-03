import * as yup from "yup";

const EDIT_QUIZ_VALIDATION = yup.object({
  name: yup.string().trim().required("Name is required"),
});

export { EDIT_QUIZ_VALIDATION };
