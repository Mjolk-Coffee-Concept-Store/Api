import { Router } from "express";
import { AppDataSource } from "../../../data-source";
import { Brunch } from "../../../entities/Brunch";
import { brunchItemsRouter } from "./items/items-route";
import { brunchReservationsRouter } from "./reservations/reservations-route";

export const brunchsRouter = Router();

brunchsRouter.post("/", createBrunch);
brunchsRouter.get("/", getBrunchs);
brunchsRouter.get("/:id", getBrunchById);
brunchsRouter.put("/:id", updateBrunch);
brunchsRouter.delete("/:id", deleteBrunch);

brunchsRouter.use("/:id/items", brunchItemsRouter);
brunchsRouter.use("/:id/reservations", brunchReservationsRouter);

async function getBrunchs(req, res) {
  // #swagger.tags = ['Brunchs']
  // #swagger.summary = 'Get brunchs'

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunchs = await brunchsRepository.find();

  return res.json(brunchs);
}

async function createBrunch(req, res) {
  // #swagger.tags = ['Brunchs']
  // #swagger.summary = 'Create a new brunch'

  const { name, description } = req.body;

  const brunchsRepository = AppDataSource.getRepository(Brunch);

  const brunch = brunchsRepository.create({
    name,
    description,
  });

  await brunchsRepository.save(brunch);

  return res.json(brunch);
}

async function getBrunchById(req, res) {
  // #swagger.tags = ['Brunchs']
  // #swagger.summary = 'Get a brunch by Id'

  const { id } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
    relations: ["items"],
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  return res.json(brunch);
}

async function deleteBrunch(req, res) {
  // #swagger.tags = ['Brunchs']
  // #swagger.summary = 'Delete a brunch by Id'

  const { id } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  await brunchsRepository.delete(id);

  return res.json({ message: "Brunch deleted" });
}

async function updateBrunch(req, res) {
  // #swagger.tags = ['Brunchs']
  // #swagger.summary = 'Update a brunch by Id'

  const { id } = req.params;
  const { name, description } = req.body;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  brunch.name = name;
  brunch.description = description;

  await brunchsRepository.save(brunch);

  return res.json(brunch);
}
