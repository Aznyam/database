import express from "express";
import { customersRouter } from "./router/customers.router";
import { productsRouter } from "./router/products.router";
import { ordersRouter } from "./router/orders.router";

const app = express();

app.use(express.json());

const port = 8000;

app.use("/customers", customersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

app.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});
