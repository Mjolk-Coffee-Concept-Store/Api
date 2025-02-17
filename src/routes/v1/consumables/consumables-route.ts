import { Router } from "express";
import { AppDataSource } from "../../../data-source";
import { Consumable } from "../../../entities/Consumable";
import { authMiddleware } from "../../../middlewares/authMiddleware";

export const consumablesRouter = Router();

consumablesRouter.post("/", authMiddleware, createConsumable);
consumablesRouter.get("/", getConsumables);
consumablesRouter.get("/:id", getConsumableById);
consumablesRouter.delete("/:id", authMiddleware, deleteConsumable);
consumablesRouter.put("/:id", authMiddleware, updateConsumable);

async function createConsumable(req, res) {
  // #swagger.tags = ['Consumables']
  // #swagger.summary = 'Create a new consumable'

  const {
    name,
    type,
    description,
    temperature,
    price,
    is_vegetarian,
    is_vegan,
    availability,
    allergens,
  } = req.body;

  const consumablesRepository = AppDataSource.getRepository(Consumable);

  const consumable = consumablesRepository.create({
    name,
    type,
    description,
    temperature,
    price,
    is_vegetarian,
    is_vegan,
    availability,
    allergens,
  });

  await consumablesRepository.save(consumable);

  return res.status(201).json(consumable);
}

async function getConsumables(req, res) {
  // #swagger.tags = ['Consumables']
  // #swagger.summary = 'Get consumables'

  const consumablesRepository = AppDataSource.getRepository(Consumable);
  const consumables = await consumablesRepository.find();

  return res.json(consumables);
}

async function getConsumableById(req, res) {
  // #swagger.tags = ['Consumables']
  // #swagger.summary = 'Get a consumable by Id'
  const { id } = req.params;

  const consumablesRepository = AppDataSource.getRepository(Consumable);
  const consumable = await consumablesRepository.findOne({
    where: { id: id },
  });

  if (!consumable) {
    return res.status(404).json({ message: "Consumable not found" });
  }

  return res.json(consumable);
}

async function deleteConsumable(req, res) {
  // #swagger.tags = ['Consumables']
  // #swagger.summary = 'Delete a consumable by Id'
  const { id } = req.params;

  const consumablesRepository = AppDataSource.getRepository(Consumable);
  const consumable = await consumablesRepository.findOne({
    where: { id: id },
  });

  if (!consumable) {
    return res.status(404).json({ message: "Consumable not found" });
  }

  await consumablesRepository.delete(consumable);

  return res.json({ message: "Consumable deleted" });
}

async function updateConsumable(req, res) {
  // #swagger.tags = ['Consumables']
  // #swagger.summary = 'Update a consumable by Id'
  const { id } = req.params;

  const {
    name,
    type,
    description,
    temperature,
    price,
    is_vegetarian,
    is_vegan,
    availability,
    allergens,
  } = req.body;

  const consumablesRepository = AppDataSource.getRepository(Consumable);
  const consumable = await consumablesRepository.findOne({
    where: { id: id },
  });

  if (!consumable) {
    return res.status(404).json({ message: "Consumable not found" });
  }

  consumable.name = name;
  consumable.type = type;
  consumable.description = description;
  consumable.temperature = temperature;
  consumable.price = price;
  consumable.is_vegetarian = is_vegetarian;
  consumable.is_vegan = is_vegan;
  consumable.availability = availability;
  consumable.allergens = allergens;

  await consumablesRepository.save(consumable);

  return res.json(consumable);
}
