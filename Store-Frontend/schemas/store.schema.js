import * as yup from "yup";
let schema = {};

schema.product = yup.object({
  name: yup.string().min(4).required("Fill this required field"),
  price: yup.number("Fill a valid price").required("Fill this required field"),
  category: yup.string().required("Fill this required field"),
});

schema.category = yup.object({
  name: yup
    .string()
    .min(8, "Min 8 characters required")
    .required("Fill this required field"),
});

schema.order = yup.object({
  address: yup
    .string()
    .min(8, "Min 8 characters required")
    .required("Fill this required field"),
  email: yup
    .string()
    .email("Fill a valid email")
    .required("Fill this required field"),
});

export default schema;
