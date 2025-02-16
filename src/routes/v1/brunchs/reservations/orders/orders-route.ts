import { Router } from "express";
import { AppDataSource } from "../../../../../data-source";
import { BrunchReservation } from "../../../../../entities/BrunchReservation";
import { BrunchOrdersItem } from "../../../../../entities/BrunchOrdersItem";
import { BrunchOrdersConsumable } from "../../../../../entities/BrunchOrdersConsumables";
import { BrunchItem } from "../../../../../entities/BrunchItem";
import { Consumable } from "../../../../../entities/Consumable";
import { authMiddleware } from "../../../../../middlewares/authMiddleware";

export const ordersBrunchRouter = Router();

ordersBrunchRouter.post("/", authMiddleware, createNewOrder);
ordersBrunchRouter.get("/", authMiddleware, getOrdersFromBrunch);
ordersBrunchRouter.delete("/item/:orderId", authMiddleware, deleteOrder);
ordersBrunchRouter.delete("/consumable/:orderId", authMiddleware, deleteOrder);

async function getOrdersFromBrunch(req, res) {
  // #swagger.tags = ['Brunchs Reservations Orders']
  // #swagger.summary = 'Get orders from a brunch reservation'

  try {
    const reservation = await getReservation(req);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    const ordersItems = await AppDataSource.getRepository(
      BrunchOrdersItem
    ).find({
      where: { reservation },
      relations: ["item"],
    });

    const ordersConsumables = await AppDataSource.getRepository(
      BrunchOrdersConsumable
    ).find({
      where: { reservation },
      relations: ["consumable"],
    });

    return res.json([...ordersItems, ...ordersConsumables]);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function createNewOrder(req, res) {
  // #swagger.tags = ['Brunchs Reservations Orders']
  // #swagger.summary = 'Create a new order for a brunch reservation'

  try {
    const reservation = await getReservation(req);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    const { type, id, comments } = req.body;
    const repository = type === "item" ? BrunchItem : Consumable;
    const orderRepository =
      type === "item" ? BrunchOrdersItem : BrunchOrdersConsumable;
    const entity = await AppDataSource.getRepository(repository).findOne({
      where: { id },
    });

    if (!entity)
      return res.status(404).json({
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`,
      });

    const order = AppDataSource.getRepository(orderRepository).create({
      [type]: entity,
      reservation,
      comments,
    });

    await AppDataSource.getRepository(orderRepository).save(order);
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function deleteOrder(req, res) {
  // #swagger.tags = ['Brunchs Reservations Orders']
  // #swagger.summary = 'Delete an order from a brunch reservation'

  try {
    const reservation = await getReservation(req);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    const orderId = req.params.orderId;
    const orderRepository = req.path.includes("item")
      ? BrunchOrdersItem
      : BrunchOrdersConsumable;
    const order = await AppDataSource.getRepository(orderRepository).findOne({
      where: { id: orderId },
    });

    if (order) {
      await AppDataSource.getRepository(orderRepository).delete(orderId);
      return res.json({ message: "Order deleted" });
    }

    return res.status(404).json({ message: "Order not found" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

const getReservation = async (req): Promise<BrunchReservation> => {
  const reservationId = req.originalUrl.split("/")[6];
  return await AppDataSource.getRepository(BrunchReservation).findOne({
    where: { id: reservationId },
    relations: ["brunchOrdersItems", "brunchOrdersConsumables"],
  });
};
