const yup = require("yup");

const product = yup.object({
  name: yup.string().min(8).required(),
  desc: yup.string().required(),
  price: yup.number().required(),
  category: yup.string().required(),
});

const schema = {
  product,
};

module.exports = schema;
