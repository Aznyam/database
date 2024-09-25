import express, { request, response } from "express";

import { sql } from "../database";

export const ordersRouter = express.Router();

ordersRouter.get("/", async (_request, response) => {
  const orders = await sql`SELECT * FROM orders`;

  response.status(200).json({
    data: orders,
  });
});
ordersRouter.post("/", async (request, response) => {
  const { customerId, productId, quantity } = request.body;

  try {
    await sql`INSERT INTO orders (customerId, productId, quantity)
                VALUES (${customerId}, ${productId}, ${quantity})`;

    response.status(200).json({ order: request.body });
  } catch (error) {
    response.status(400).json({ message: error });
  }
});
ordersRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const data = await sql`SELECT orders.orderID, customers.customerId
    FROM orders
    INNER JOIN customers ON orders.customerId=customers.customerId
    WHERE customers.customerId = ${id}`;
    response.status(200).json({ order: data });
  } catch (error) {
    response.status(400).json({ message: error });
  }
});
ordersRouter.get("/product/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const data = await sql`SELECT orders.orderID, products.productId 
    FROM orders
    INNER JOIN products ON orders.productId=products.productId
    WHERE products.productId = ${id}`;
    response.status(200).json({ order: data });
  } catch (error) {
    response.status(400).json({ message: error });
  }
});
