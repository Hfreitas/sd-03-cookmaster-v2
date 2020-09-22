// services
const { CreateRecipe, DeleteRecipe, GetAllRecipes, GetRecipeById, UpdateRecipe } = require('../services/recipesServices');

const getAllRecipes = async (_req, res) => {
  const recipes = await GetAllRecipes();
  res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { ok, status, message, recipe } = await GetRecipeById(id);
  if (ok) return res.status(status).json(recipe);
  return res.status(status).json({ message });
};

const updateRecipe = async (req, res) => {
  const {
    user: { id: userId, role },
    body: { name, ingredients, preparation },
    params: { id },
  } = req;
  const {
    ok, status, message, recipe,
  } = await UpdateRecipe(userId, role, id, name, ingredients, preparation);
  if (ok) return res.status(status).json(recipe);
  return res.status(status).json({ message });
};

const updateImage = async (req, res) => {
  const { user: { id: userId }, params: { id } } = req;
  res.status(200).json({ userId, id });
};

const createRecipe = async (req, res) => {
  const { user: { id }, body: { name, ingredients, preparation } } = req;
  const { ok, status, message, recipe } = await CreateRecipe(id, name, ingredients, preparation);
  if (ok) {
    return res.status(status).json({ recipe });
  }
  return res.status(status).json({ message });
};

const deleteRecipe = async (req, res) => {
  const { user, params: { id } } = req;
  const { ok, status } = await DeleteRecipe(user.id, user.role, id);
  if (ok) return res.status(status).json();
  return res.status(status).json();
};

module.exports = {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateImage,
  updateRecipe,
};
