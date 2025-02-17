import { Router } from "express";
import { AppDataSource } from "../../../../data-source";
import { Brunch } from "../../../../entities/Brunch";
import { BrunchReservation } from "../../../../entities/BrunchReservation";
import { ordersBrunchRouter } from "./orders/orders-route";

export const brunchReservationsRouter = Router();

brunchReservationsRouter.use("/:reservationId/orders", ordersBrunchRouter);

brunchReservationsRouter.post("/", createBrunchReservation);
brunchReservationsRouter.get("/", getBrunchReservations);
brunchReservationsRouter.get("/:reservationId", getBrunchReservationById);
brunchReservationsRouter.put("/:reservationId", updateBrunchReservation);
brunchReservationsRouter.delete("/:reservationId", deleteBrunchReservation);

async function createBrunchReservation(req, res) {
  // #swagger.tags = ['Brunchs Reservations']
  // #swagger.summary = 'Create a new brunch reservation'

  const {
    customer_name,
    customer_email,
    customer_phone,
    company_name,
    reservation_date,
    number_of_people,
    table_number,
  } = req.body;

  const { id } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  const reservationsRepository = AppDataSource.getRepository(BrunchReservation);

  const reservation = reservationsRepository.create({
    customer_name,
    customer_email,
    customer_phone,
    company_name,
    reservation_date,
    number_of_people,
    created_at: new Date(),
    table_number,
    brunch,
  });

  await reservationsRepository.save(reservation);

  return res.status(201).json(reservation);
}

async function getBrunchReservations(req, res) {
  // #swagger.tags = ['Brunchs Reservations']
  // #swagger.summary = 'Get all brunch reservations'

  const { id } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
    relations: ["reservations"],
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  return res.json(brunch.reservations);
}

async function getBrunchReservationById(req, res) {
  // #swagger.tags = ['Brunchs Reservations']
  // #swagger.summary = 'Get a brunch reservation by Id'

  const { id, reservationId } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
    relations: ["reservations"],
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  const reservation = brunch.reservations.find(
    (reservation) => reservation.id === reservationId
  );

  if (!reservation) {
    return res.status(404).json({ message: "Brunch reservation not found" });
  }

  return res.json(reservation);
}

async function updateBrunchReservation(req, res) {
  // #swagger.tags = ['Brunchs Reservations']
  // #swagger.summary = 'Update a brunch reservation by Id'

  const { id, reservationId } = req.params;

  const {
    customer_name,
    customer_email,
    customer_phone,
    company_name,
    reservation_date,
    number_of_people,
    table_number,
  } = req.body;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
    relations: ["reservations"],
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  const reservation = brunch.reservations.find(
    (reservation) => reservation.id === reservationId
  );

  if (!reservation) {
    return res.status(404).json({ message: "Brunch reservation not found" });
  }

  const reservationsRepository = AppDataSource.getRepository(BrunchReservation);

  await reservationsRepository.update(reservationId, {
    customer_name,
    customer_email,
    customer_phone,
    company_name,
    reservation_date,
    number_of_people,
    table_number,
  });

  return res.json({ message: "Brunch reservation updated" });
}

async function deleteBrunchReservation(req, res) {
  // #swagger.tags = ['Brunchs Reservations']
  // #swagger.summary = 'Delete a brunch reservation by Id'

  const { id, reservationId } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
    relations: ["reservations"],
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  const reservation = brunch.reservations.find(
    (reservation) => reservation.id === reservationId
  );

  if (!reservation) {
    return res.status(404).json({ message: "Brunch reservation not found" });
  }

  const reservationsRepository = AppDataSource.getRepository(BrunchReservation);

  await reservationsRepository.delete(reservationId);

  return res.json({ message: "Brunch reservation deleted" });
}
