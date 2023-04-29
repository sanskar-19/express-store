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

// Add New Categories
router.post(
  "/category",
  jwt.verifyAccessToken,
  validation(schema.category),
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const uid = uuid.uuid("cat_id");
      const query = `INSERT INTO categories (category_id, name) VALUES('${uid}','${name}')`;
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
            data: { name, id: uid },
            message: "Category Added",
            error: null,
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// Fetch all categories
router.get(
  "/fetch_all_categories",
  jwt.verifyAccessToken,
  async (req, res, next) => {
    try {
      let query = `SELECT * from categories`;
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
            message: "Fetched all categories",
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
