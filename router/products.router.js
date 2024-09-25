import express, { request, response } from "express";

import { sql } from "../database";

export const productsRouter = express.Router();

productsRouter.get("/", async (_request, response) => {
  const products = await sql`SELECT * FROM products`;

  response.status(200).json({
    data: products,
  });
});
productsRouter.post("/", async (request, response) => {
  const { productName, price } = request.body;
  try {
    await sql`INSERT INTO products (productName, price)
              VALUES (${productName}, ${price})`;

    response.status(200).json({ product: request.body });
  } catch (error) {
    response.status(400).json({ message: "aldaa garlaa" });
  }
});
productsRouter.delete("/", async (request, response) => {
  const { id } = request.body;
  try {
    await sql`DELETE FROM products WHERE productId=${Number(id)}`;
    response.status(200).json({ product: request.body });
  } catch (error) {
    response.status(400).json({ message: "aldaa garlaa" });
  }
});
