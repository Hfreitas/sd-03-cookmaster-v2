const express = require('express');
const controllers = require('../controllers/index');
const validateJWT = require('../middlewares/validateJWT');

const recipesRoutes = express.Router();

recipesRoutes
  .post('/', validateJWT, controllers.recipesController.newRecipe)
  .get('/:id', controllers.recipesController.getRecipeById)
  .get('/', controllers.recipesController.getAllRecipes);

module.exports = {
  recipesRoutes,
};
