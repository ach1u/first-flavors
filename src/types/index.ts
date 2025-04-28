export interface Ingredient {
  id: string;
  name: string;
  dateIntroduced?: Date;
  isAllergen: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeIngredient {
  recipeId: string;
  ingredientId: string;
  ingredient: Ingredient;
  quantity?: number;
  unit?: string;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  preparationTime?: number;
  ageRangeStart?: number;
  ageRangeEnd?: number;
  instructions?: string;
  recipeIngredients: RecipeIngredient[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MealPlan {
  id: string;
  recipe: Recipe;
  plannedDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}