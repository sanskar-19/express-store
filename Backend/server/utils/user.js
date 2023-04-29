const bcrypt = require("bcrypt");
async function hash_password(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
async function verify_password(password, hashedPassword) {
  let response = await bcrypt.compare(password, hashedPassword);
  return response;
}

module.exports = { hash_password, verify_password };
