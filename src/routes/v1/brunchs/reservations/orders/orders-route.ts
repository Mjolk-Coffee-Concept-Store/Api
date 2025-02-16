import { Router } from "express";
import { AppDataSource } from "../../../../../data-source";
import { Brunch } from "../../../../../entities/Brunch";
import { BrunchReservation } from "../../../../../entities/BrunchReservation";
import { BrunchOrdersItem } from "../../../../../entities/BrunchOrdersItem";
import { BrunchOrdersConsumable } from "../../../../../entities/BrunchOrdersConsumables";

export const ordersBrunchRouter = Router();

ordersBrunchRouter.post("/", getOrdersFromBrunch);

async function getOrdersFromBrunch(req, res) {
  // #swagger.tags = ['Brunchs Reservations Orders']
  // #swagger.summary = 'Get orders from a brunch reservation'

  try {
    const reservation = await getReservation(req, res);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const orders: (BrunchOrdersItem | BrunchOrdersConsumable)[] = [
      ...reservation.brunchOrdersItems,
      ...reservation.brunchOrdersConsumables,
    ];

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

const getReservation = async (req, res): Promise<BrunchReservation> => {
  const { id, reservationId } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { Id_Brunch: id },
    relations: ["reservations"],
  });

  if (!brunch) {
    return null;
  }

  const reservation = brunch.reservations.find(
    (reservation) => reservation.Id_Brunch_reservation === reservationId
  );

  if (!reservation) {
    return null;
  }

  return reservation;
};
