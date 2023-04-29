const yup = require("yup");

const product = yup.object({
  name: yup.string().min(4).required(),
  price: yup.number().required(),
  category: yup.string().required(),
});
const cart = yup.object({
  product_id: yup.string().required(),
});

const schema = {
  product,
  cart,
};

module.exports = schema;
