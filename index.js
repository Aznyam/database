import express from "express";
import { customersRouter } from "./router/customers.router";

const app = express();

app.use(express.json());

const port = 8000;

app.use("/customers", customersRouter);

app.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});
