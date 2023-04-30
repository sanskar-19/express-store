const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  // database: "appleute",
});

const create_table_queries = {
  users:
    "CREATE TABLE `users` (`user_id` VARCHAR(100) NOT NULL,`email` VARCHAR(100) NOT NULL,`password` VARCHAR(200) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,UNIQUE(`email`), PRIMARY KEY (`user_id`));",

  orders:
    "CREATE TABLE `orders` (`order_id` VARCHAR(200) NOT NULL,`user_id` VARCHAR(200) NOT NULL,`email` VARCHAR(100) NOT NULL,`address` VARCHAR(200) NOT NULL,`options` VARCHAR(1000) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`order_id`), FOREIGN KEY (`user_id`) REFERENCES users(`user_id`));",

  categories:
    "CREATE TABLE `categories` (`category_id` VARCHAR(200) NOT NULL,`name` VARCHAR(100) NOT NULL,`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,UNIQUE(`name`),PRIMARY KEY (`category_id`));",

  products:
    "CREATE TABLE `products` (`id` VARCHAR(200) NOT NULL,`name` VARCHAR(200) NOT NULL,`category_id` VARCHAR(200) NOT NULL,`price` BIGINT,`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`), FOREIGN KEY (`category_id`) REFERENCES categories(`category_id`));",

  cart: "CREATE TABLE `cart` (`user_id` VARCHAR(200) NOT NULL,`product_id` VARCHAR(200) NOT NULL,`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  FOREIGN KEY (`product_id`) REFERENCES products(`id`),  FOREIGN KEY (`user_id`) REFERENCES users(`user_id`));",
};

connection.connect((err) => {
  if (err) throw err;
  try {
    // DROP EXISITING TABLES
    // connection.query(
    //   "DROP TABLE users, products, orders, categories;",
    //   (err, result) => {
    //     if (err) throw err;
    //     console.log("All dropped");
    //   }
    // );
    connection.query("CREATE DATABASE test_db;");
    connection.query("USE test_db;");
    // Users
    connection.query(create_table_queries.users, (err, result) => {
      if (err) throw err;
      console.log("Users Table created");
    });
    // Orders
    connection.query(create_table_queries.orders, (err, result) => {
      if (err) throw err;
      console.log("Orders Table created");
    });
    // Categories
    connection.query(create_table_queries.categories, (err, result) => {
      if (err) throw err;
      console.log("Categories Table created");
    });
    // Products
    connection.query(create_table_queries.products, (err, result) => {
      if (err) throw err;
      console.log("Products Table created");
    });
    // Cart
    connection.query(create_table_queries.cart, (err, result) => {
      if (err) throw err;
      console.log("Cart Table created");
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = connection;
