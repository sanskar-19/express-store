const express = require("express");
const config = require("./server/configs/server.config");
const bodyparser = require("body-parser");
const { verifyAccessToken } = require("./server/utils/jwt");
const connection = require("./server/configs/db.config");
// Initialising app
app = express();

// Adding body parse for post
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api", require("./server/routes/auth.routes"));
app.use("/api", require("./server/routes/category.routes"));
app.use("/api", require("./server/routes/product.routes"));
app.use("/api", require("./server/routes/cart.routes"));

app.use((err, req, res, next) => {
  res.status(err.status).send({
    statusCode: err.status,
    data: {},
    message: null,
    error: err.message,
  });
});

app.listen(config.PORT, config.HOST);
