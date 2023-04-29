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

// Create new order from the cart
router.post(
  "/create-order",
  jwt.verifyAccessToken,
  validation(schema.order),
  async (req, res, next) => {
    try {
      let { user_id } = req.payload;
      let query = `SELECT products.id, products.name, products.price from (SELECT * from cart WHERE user_id = '${user_id}') 
        as temp INNER JOIN products ON temp.product_id = products.id`;
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
          console.log(result);
          if (result?.length) {
            let { email, user_id } = req.payload;
            let payload_email = req?.body?.email;
            let { address } = req.body;
            let order_id = uuid.uuid();
            let options = JSON.stringify(result);

            // Create an order here
            query = `INSERT INTO orders (order_id, user_id, email,address, options) VALUES('${order_id}', '${user_id}', '${
              payload_email ?? email
            }', '${address}','${options}')`;
            connection.query(query, (err, result) => {
              if (err) {
                // Some error occurred
                res.status(400).send({
                  statusCode: 400,
                  data: {},
                  message: null,
                  error: err.sqlMessage,
                });
              }
            });

            // Delete from cart now
            query = `DELETE from cart WHERE user_id = '${user_id}'`;
            connection.query(query, (err, result) => {
              if (err) {
                // Some error occurred
                res.status(400).send({
                  statusCode: 400,
                  data: {},
                  message: null,
                  error: err.sqlMessage,
                });
              } else {
                //   Send successful response of order created
                res.status(201).send({
                  statusCode: 201,
                  data: {
                    order_id,
                    email: payload_email ?? email,
                    address,
                    details: JSON.parse(options),
                  },
                  message: "Order Created Successfully",
                  error: null,
                });
              }
            });
          } else {
            res.status(400).send({
              statusCode: 400,
              data: {},
              message: "Nothing in cart to create an order",
              error: null,
            });
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
