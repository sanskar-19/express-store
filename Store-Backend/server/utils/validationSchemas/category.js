const yup = require("yup");

const category = yup.object({
  name: yup.string().min(8).required(),
});

const schema = {
  category,
};

module.exports = schema;
