const express = require("express");
const router = express.Router();
const createErrors = require("http-errors");
const validation = require("../utils/middlewares/validation");
const schema = require("../utils/validationSchemas/product");
const connection = require("../configs/db.config");
const uuid = require("uuidv4");
// JWT utils
const { signAccessToken } = require("../utils/jwt/index");
const jwt = require("../utils/jwt/index");

// Add New Product
router.post(
  "/product",
  jwt.verifyAccessToken,
  validation(schema.product),
  async (req, res, next) => {
    try {
      const { name, price, category } = req.body;
      console.log(category);
      const uid = uuid.uuid();
      const query = `INSERT INTO products (id, name, category_id, price) VALUES ('${uid}','${name}','${category}','${price}')`;
      //   INSERT INTO `test_db`.`products` (`id`, `name`, `category_id`, `desc`, `price`, `created_at`, `updated_at`) VALUES ('12345', 'test', '7b5fbdf8-3180-4060-8046-c0806693c00a', 'test', '12', '2023-04-29 16:24:53', '2023-04-29 16:24:53');

      connection.query(query, (err, result) => {
        if (err) {
          console.log(err);
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
            message: "Product Added",
            error: null,
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// Fetch all products
router.get(
  "/fetch_all_products",
  jwt.verifyAccessToken,
  async (req, res, next) => {
    try {
      let query = `SELECT * from products`;
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
            message: "Fetched all products",
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
