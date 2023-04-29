const express = require("express");
const router = express.Router();
const createErrors = require("http-errors");
const validation = require("../utils/middlewares/validation");
const schema = require("../utils/validationSchemas/auth");
const connection = require("../configs/db.config");
const uuid = require("uuidv4");
// JWT utils
const { signAccessToken } = require("../utils/jwt/index");
const jwt = require("../utils/jwt/index");
const utils_user = require("../utils/user");

// Login
router.post("/login", validation(schema.login), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const query = `SELECT * FROM USERS WHERE email = '${email}'`;
    let user = null;
    connection.query(query, async (err, result) => {
      if (err) {
        res.status(400).send({
          statusCode: 404,
          data: {},
          message: null,
          error: err.sqlMessage,
        });
      }
      user = result;
      if (!user.length) {
        res.status(400).send({
          statusCode: 400,
          data: {},
          message: null,
          error: "No account associated with this email found",
        });
      } else {
        if (await utils_user.verify_password(password, user[0].password)) {
          let token = await jwt.signAccessToken({
            user_id: user[0]?.user_id,
            email: user[0]?.email,
          });
          res.status(200).send({
            statusCode: 200,
            data: { token },
            message: "User Logged In",
          });
        } else {
          res.status(400).send({
            statusCode: 400,
            data: {},
            message: null,
            error: "Check your username and password",
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// register
router.post(
  "/register",
  validation(schema.register),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const uid = uuid.uuid();
      // const cart_id = "c_id_" + uuid.uuid();
      const query = `INSERT INTO users (user_id, email, password) VALUES ('${uid}', '${email}', '${await utils_user.hash_password(
        password
      )}')`;
      connection.query(query, (err, result) => {
        if (err) {
          res.status(400).send({
            statusCode: 400,
            data: {},
            message: null,
            error: err.sqlMessage,
          });
        } else {
          res.status(201).send({
            statusCode: 201,
            data: {},
            message: "User Created",
            error: null,
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch all users
router.get(
  "/fetch_all_users",
  jwt.verifyAccessToken,
  async (req, res, next) => {
    try {
      let query = `SELECT user_id, email, created_at from users`;
      connection.query(query, (err, result) => {
        if (err) {
          res.status(400).send({
            statusCode: 400,
            data: {},
            message: null,
            error: err.sqlMessage,
          });
        } else {
          res.status(200).send({
            statusCode: 200,
            data: result,
            message: "Fetched all users",
            error: null,
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
