import * as yup from "yup";
let schema = {};

schema.login = yup.object({
  email: yup
    .string()
    .email("Fill a valid email")
    .required("Fill this required field"),
  password: yup
    .string()
    .min(8, "Min 8 characters required")
    .required("Fill this required field"),
});

schema.register = yup.object({
  email: yup
    .string()
    .email("Fill a valid email")
    .required("Fill this required field"),
  password: yup
    .string()
    .min(8, "Min 8 characters required")
    .required("Fill this required field"),
});

export default schema;
