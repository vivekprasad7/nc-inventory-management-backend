const dotenv = require("dotenv")
dotenv.config({
    path:'./.env'
})
require("./db/db.connect");


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const itemRouter = require("./routes/item.route.js");
const salesRouter = require("./routes/sales.route.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/items", itemRouter);
app.use("/sales", salesRouter);

app.get("/", (req, res) => {
  res.send("Inventory Management Backend");
});

app.use("/", (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

app.listen(`${PORT}`, () => {
  console.log(`Server is running on ${PORT}`);
});
