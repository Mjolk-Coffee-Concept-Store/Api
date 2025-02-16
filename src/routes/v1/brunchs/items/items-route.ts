import { Router } from "express";
import { AppDataSource } from "../../../../data-source";
import { Brunch } from "../../../../entities/Brunch";
import { BrunchItem } from "../../../../entities/BrunchItem";

export const brunchsItemRouter = Router();

brunchsItemRouter.post("/", createBrunchItems);
brunchsItemRouter.post("/collection", createBrunchItemsCollection);
brunchsItemRouter.get("/", getBrunchItems);
brunchsItemRouter.get("/:itemId", getBrunchItemById);
brunchsItemRouter.put("/:itemId", updateBrunchItem);
brunchsItemRouter.delete("/:itemId", deleteBrunchItem);
brunchsItemRouter.delete("/", deleteBrunchItems);

async function getBrunchItems(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Get brunch items'

  const { id } = req.params;

  try {
    const brunchsRepository = AppDataSource.getRepository(Brunch);
    const brunch = await brunchsRepository.findOne({
      where: { Id_Brunch: id },
      relations: ["items"],
    });

    if (!brunch) {
      return res.status(404).json({ message: "Brunch not found" });
    }

    return res.json(brunch.items);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
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

  try {
    const brunchsRepository = AppDataSource.getRepository(Brunch);
    const brunch = await brunchsRepository.findOne({
      where: { Id_Brunch: id },
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
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function createBrunchItemsCollection(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Create a new brunch item collection'

  const items = req.body;
  const { id } = req.params;

  try {
    const brunchsRepository = AppDataSource.getRepository(Brunch);
    const brunch = await brunchsRepository.findOne({
      where: { Id_Brunch: id },
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
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function getBrunchItemById(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Get a brunch item by Id'

  const { id, itemId } = req.params;

  try {
    const brunchsRepository = AppDataSource.getRepository(Brunch);
    const brunch = await brunchsRepository.findOne({
      where: { Id_Brunch: id },
      relations: ["items"],
    });

    if (!brunch) {
      return res.status(404).json({ message: "Brunch not found" });
    }

    const item = brunch.items.find((item) => item.Id_Brunch_item === itemId);

    if (!item) {
      return res.status(404).json({ message: "Brunch item not found" });
    }

    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function deleteBrunchItem(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Delete a brunch item by Id'

  const { id, itemId } = req.params;

  try {
    const brunchsRepository = AppDataSource.getRepository(Brunch);
    const brunch = await brunchsRepository.findOne({
      where: { Id_Brunch: id },
      relations: ["items"],
    });

    if (!brunch) {
      return res.status(404).json({ message: "Brunch not found" });
    }

    const item = brunch.items.find((item) => item.Id_Brunch_item === itemId);

    if (!item) {
      return res.status(404).json({ message: "Brunch item not found" });
    }

    const brunchItemsRepository = AppDataSource.getRepository(BrunchItem);

    await brunchItemsRepository.remove(item);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function deleteBrunchItems(req, res) {
  // #swagger.tags = ['Brunchs Items']
  // #swagger.summary = 'Delete brunch items'

  const { id } = req.params;

  try {
    const brunchsRepository = AppDataSource.getRepository(Brunch);
    const brunch = await brunchsRepository.findOne({
      where: { Id_Brunch: id },
      relations: ["items"],
    });

    if (!brunch) {
      return res.status(404).json({ message: "Brunch not found" });
    }

    const brunchItemsRepository = AppDataSource.getRepository(BrunchItem);

    await brunchItemsRepository.remove(brunch.items);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
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

  try {
    const brunchsRepository = AppDataSource.getRepository(Brunch);
    const brunch = await brunchsRepository.findOne({
      where: { Id_Brunch: id },
      relations: ["items"],
    });

    if (!brunch) {
      return res.status(404).json({ message: "Brunch not found" });
    }

    const item = brunch.items.find((item) => item.Id_Brunch_item === itemId);

    if (!item) {
      return res.status(404).json({ message: "Brunch item not found" });
    }

    const brunchItemsRepository = AppDataSource.getRepository(BrunchItem);

    await brunchItemsRepository.update(item.Id_Brunch_item, {
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
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
