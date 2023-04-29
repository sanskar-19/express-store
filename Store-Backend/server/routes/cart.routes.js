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

// Add New Product to the cart
router.post(
  "/add_to_cart",
  jwt.verifyAccessToken,
  validation(schema.cart),
  async (req, res, next) => {
    try {
      const { user_id } = req.payload;
      const { product_id } = req.body;
      let elements = [];
      for (
        let productIndex = 0;
        productIndex < product_id.length;
        productIndex++
      ) {
        elements.push(`('${user_id}','${product_id[productIndex]}')`);
      }
      const query = `INSERT INTO cart (user_id, product_id) VALUES ${elements.join(
        ","
      )}`;
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
            message: "Product Added to Cart",
            error: null,
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// Fetch cart items
router.get(
  "/fetch_cart_items",
  jwt.verifyAccessToken,
  async (req, res, next) => {
    try {
      let { user_id } = req.payload;
      let query = `SELECT products.id, products.name, products.price from (SELECT * from cart WHERE user_id = '${user_id}') 
      as temp INNER JOIN products ON temp.product_id = products.id`;
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
            message: "Fetched all cart items",
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
