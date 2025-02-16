import { Router } from "express";
import { AppDataSource } from "../../../data-source";
import { Recommendation } from "../../../entities/Recommendation";
import { authMiddleware } from "../../../middlewares/authMiddleware";

export const recommendationsRouter = Router();

recommendationsRouter.post("/", createRecommendation);
recommendationsRouter.get("/", authMiddleware, getRecommendations);
recommendationsRouter.get("/:id", authMiddleware, getRecommendationById);
recommendationsRouter.delete("/:id", authMiddleware, deleteRecommendation);

async function getRecommendations(req, res) {
  // #swagger.tags = ['Recommendations']
  // #swagger.summary = 'Get recommendations'

  try {
    const recommendationsRepository =
      AppDataSource.getRepository(Recommendation);
    const recommendations = await recommendationsRepository.find();

    return res.json(recommendations);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function createRecommendation(req, res) {
  // #swagger.tags = ['Recommendations']
  // #swagger.summary = 'Create a new recommendation'

  const { email, name, content, visit_date, rating } = req.body;

  try {
    const recommendationsRepository =
      AppDataSource.getRepository(Recommendation);

    const recommendation = recommendationsRepository.create({
      email,
      name,
      content,
      visit_date,
      rating,
      submission_date: new Date(),
    });

    await recommendationsRepository.save(recommendation);

    return res.json(recommendation);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function getRecommendationById(req, res) {
  // #swagger.tags = ['Recommendations']
  // #swagger.summary = 'Get a recommendation by Id'
  const { id } = req.params;

  try {
    const recommendationsRepository =
      AppDataSource.getRepository(Recommendation);
    const recommendation = await recommendationsRepository.findOne({
      where: { id: id },
    });

    if (!recommendation) {
      return res.status(404).json({ message: "Recommendation not found" });
    }

    return res.json(recommendation);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function deleteRecommendation(req, res) {
  // #swagger.tags = ['Recommendations']
  // #swagger.summary = 'Delete a recommendation by Id'
  const { id } = req.params;

  try {
    const recommendationsRepository =
      AppDataSource.getRepository(Recommendation);
    const recommendation = await recommendationsRepository.findOne({
      where: { id: id },
    });

    if (!recommendation) {
      return res.status(404).json({ message: "Recommendation not found" });
    }

    await recommendationsRepository.delete(id);

    return res.json({ message: "Recommendation deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
