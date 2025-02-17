import { Router } from "express";
import { AppDataSource } from "../../../../data-source";
import { Brunch } from "../../../../entities/Brunch";
import { BrunchItem } from "../../../../entities/BrunchItem";
import { authMiddleware } from "../../../../middlewares/authMiddleware";

export const brunchItemsRouter = Router();

brunchItemsRouter.post("/", authMiddleware, createBrunchItems);
brunchItemsRouter.post(
  "/collection",
  authMiddleware,
  createBrunchItemsCollection
);
brunchItemsRouter.get("/", getBrunchItems);
brunchItemsRouter.get("/:itemId", getBrunchItemById);
brunchItemsRouter.put("/:itemId", updateBrunchItem);
brunchItemsRouter.delete("/:itemId", authMiddleware, deleteBrunchItem);
brunchItemsRouter.delete("/", authMiddleware, deleteBrunchItems);

async function getBrunchItems(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Get brunch items'

  const { id } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
    relations: ["items"],
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  return res.json(brunch.items);
}

async function createBrunchItems(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Create a new brunch item'

  const {
    name,
    course,
    description,
    availability,
    is_vegetarian,
    is_vegan,
    allergens,
    hidden_price,
  } = req.body;
  const { id } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  const brunchItemsRepository = AppDataSource.getRepository(BrunchItem);

  const brunchItem = brunchItemsRepository.create({
    name,
    course,
    description,
    availability,
    is_vegetarian,
    is_vegan,
    allergens,
    hidden_price,
    brunch,
  });

  await brunchItemsRepository.save(brunchItem);

  return res.status(201).json(brunchItem);
}

async function createBrunchItemsCollection(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Create a new brunch item collection'

  const items = req.body;
  const { id } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  const brunchItemsRepository = AppDataSource.getRepository(BrunchItem);

  const brunchItems = items.map((item) => {
    return brunchItemsRepository.create({
      ...item,
      brunch,
    });
  });

  await brunchItemsRepository.save(brunchItems);

  return res.status(201).json(brunchItems);
}

async function getBrunchItemById(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Get a brunch item by Id'

  const { id, itemId } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
    relations: ["items"],
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  const item = brunch.items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: "Brunch item not found" });
  }

  return res.json(item);
}

async function deleteBrunchItem(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Delete a brunch item by Id'

  const { id, itemId } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
    relations: ["items"],
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  const item = brunch.items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: "Brunch item not found" });
  }

  const brunchItemsRepository = AppDataSource.getRepository(BrunchItem);

  await brunchItemsRepository.remove(item);

  return res.status(204).send();
}

async function deleteBrunchItems(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Delete brunch items'

  const { id } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
    relations: ["items"],
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  const brunchItemsRepository = AppDataSource.getRepository(BrunchItem);

  await brunchItemsRepository.remove(brunch.items);

  return res.status(204).send();
}

async function updateBrunchItem(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Update a brunch item by Id'

  const {
    name,
    course,
    description,
    availability,
    is_vegetarian,
    is_vegan,
    allergens,
    hidden_price,
  } = req.body;
  const { id, itemId } = req.params;

  const brunchsRepository = AppDataSource.getRepository(Brunch);
  const brunch = await brunchsRepository.findOne({
    where: { id: id },
    relations: ["items"],
  });

  if (!brunch) {
    return res.status(404).json({ message: "Brunch not found" });
  }

  const item = brunch.items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: "Brunch item not found" });
  }

  const brunchItemsRepository = AppDataSource.getRepository(BrunchItem);

  await brunchItemsRepository.update(item.id, {
    name,
    course,
    description,
    availability,
    is_vegetarian,
    is_vegan,
    allergens,
    hidden_price,
  });

  return res.status(204).send();
}
