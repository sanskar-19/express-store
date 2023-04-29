const yup = require("yup");

const product = yup.object({
  name: yup.string().min(4).required(),
  price: yup.number().required(),
  category: yup.string().required(),
});

const cart = yup.object({
  product_id: yup.array().required(),
});

const order = yup.object({
  address: yup.string().min(5).required(),
});

const category = yup.object({
  name: yup.string().min(8).required(),
});

const schema = {
  product,
  cart,
  order,
  category,
};

module.exports = schema;
