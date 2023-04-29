const yup = require("yup");

const login = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

const register = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

const schema = {
  login,
  register,
};

module.exports = schema;
