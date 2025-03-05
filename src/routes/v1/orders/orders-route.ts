import { Router } from "express";
import { AppDataSource } from "../../../data-source";
import { Consumable } from "../../../entities/Consumable";
import { ConsumablesOrder } from "../../../entities/ConsumablesOrder";
import { ConsumablesOrdered } from "../../../entities/ConsumablesOrdered";
import { In } from "typeorm";
import { authMiddleware } from "../../../middlewares/authMiddleware";

export const ordersRouter = Router();

ordersRouter.post("/", createOrder);
ordersRouter.post("/serve/:unitOrderId", toggleOrderCompleted);
ordersRouter.post("/:id/serveAll", serveOrderAll);
ordersRouter.post("/:id/complete", completeOrder);
ordersRouter.get("/", authMiddleware, getOrders);
ordersRouter.get("/getNotCompleted", getNotCompletedOrders);
ordersRouter.get("/:id", getOrder);
ordersRouter.delete("/:id", deleteOrder);

async function getOrders(req, res) {
  // #swagger.tags = ['Orders']
  // #swagger.summary = 'Get orders'

  const orders = await AppDataSource.getRepository(ConsumablesOrder).find({
    relations: ["consumablesOrdered", "consumablesOrdered.consumable"],
  });
  return res.json(orders);
}

async function getNotCompletedOrders(req, res) {
  // #swagger.tags = ['Orders']
  // #swagger.summary = 'Get orders not completed'

  const orders = await AppDataSource.getRepository(ConsumablesOrder).find({
    where: { completed: false },
    relations: ["consumablesOrdered", "consumablesOrdered.consumable"],
  });
  return res.json(orders);
}

async function createOrder(req, res) {
  // #swagger.tags = ['Orders']
  // #swagger.summary = 'Create a new order'
  /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                table_number: {
                  type: "number"
                },
                orders: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string"
                        },
                        comments: {
                            oneOf: [
                              { type: "string" },
                              { type: "null" }
                            ]
                        }
                    }
                  }
                }
              },
              required: ["table_number", "orders"]
            }
          }
        }    
    }
   */

  const { orders, table_number } = req.body;

  const orderIds = [...new Set(orders.map((order) => order.id))];

  const consumables = await AppDataSource.getRepository(Consumable).findBy({
    id: In(orderIds),
  });

  if (orderIds.length !== consumables.length) {
    return res.status(404).json({ message: "Consumables not found" });
  }

  const consumablesOrder = new ConsumablesOrder();
  consumablesOrder.table_number = table_number;
  consumablesOrder.submission_date = new Date();
  consumablesOrder.completed = false;

  await AppDataSource.getRepository(ConsumablesOrder).save(consumablesOrder);

  const consumablesOrdered = orders.map((order) => {
    const consumable = consumables.find((c) => c.id === order.id);
    const consumableOrdered = new ConsumablesOrdered();
    consumableOrdered.consumable = consumable;
    consumableOrdered.consumablesOrder = consumablesOrder;
    consumableOrdered.comments = order.comments;
    consumableOrdered.served = false;
    return consumableOrdered;
  });

  await AppDataSource.getRepository(ConsumablesOrdered).save(
    consumablesOrdered
  );

  return res.json(consumablesOrder);
}

async function getOrder(req, res) {
  // #swagger.tags = ['Orders']
  // #swagger.summary = 'Get order'
  const order = await AppDataSource.getRepository(ConsumablesOrder).findOne({
    where: { id: req.params.id },
    relations: ["consumablesOrdered", "consumablesOrdered.consumable"],
  });

  if (!order) return res.status(404).json({ message: "Order not found" });

  return res.json(order);
}

async function toggleOrderCompleted(req, res) {
  // #swagger.tags = ['Orders']
  // #swagger.summary = 'Serve order'

  const order = await AppDataSource.getRepository(ConsumablesOrdered).findOne({
    where: { id: req.params.unitOrderId },
  });

  if (!order) return res.status(404).json({ message: "Order not found" });

  order.served = !order.served;

  await AppDataSource.getRepository(ConsumablesOrdered).save(order);

  return res.json(order);
}

async function serveOrderAll(req, res) {
  // #swagger.tags = ['Orders']
  // #swagger.summary = 'Serve all orders'

  const orders = await AppDataSource.getRepository(ConsumablesOrdered).find({
    where: { Id_Consumables_Order: req.params.id },
  });

  if (!orders) return res.status(404).json({ message: "Orders not found" });

  orders.forEach((order) => {
    order.served = true;
  });

  await AppDataSource.getRepository(ConsumablesOrdered).save(orders);

  return res.json(orders);
}

async function completeOrder(req, res) {
  // #swagger.tags = ['Orders']
  // #swagger.summary = 'Complete order'

  const { id } = req.params;

  const order = await AppDataSource.getRepository(ConsumablesOrder).findOne({
    where: { id: id },
  });

  if (!order) return res.status(404).json({ message: "Order not found" });

  order.completed = true;

  await AppDataSource.getRepository(ConsumablesOrder).save(order);

  return res.json(order);
}

async function deleteOrder(req, res) {
  // #swagger.tags = ['Orders']
  // #swagger.summary = 'Delete order'

  const { id } = req.params;

  const orderRepository = AppDataSource.getRepository(ConsumablesOrder);

  const order = await orderRepository.findOne({
    where: { id: id },
  });

  if (!order) return res.status(404).json({ message: "Order not found" });

  const orderedRepository = AppDataSource.getRepository(ConsumablesOrdered);
  const ordered = await orderedRepository.find({
    where: { consumablesOrder: order },
  });

  if (!ordered) return res.status(404).json({ message: "Order not found" });

  await orderedRepository.remove(ordered);

  await orderRepository.remove(order);

  return res.json({ message: "Order deleted" });
}
