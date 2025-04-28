import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  Autocomplete,
  Chip,
  Typography,
} from '@mui/material';
import type { Recipe, Ingredient, RecipeIngredient } from '@/types';

interface RecipeFormProps {
  recipe?: Partial<Recipe>;
  ingredients: Ingredient[];
  onSubmit: (recipe: Partial<Omit<Recipe, 'recipeIngredients'>> & { recipeIngredients?: Partial<RecipeIngredient>[] }) => Promise<void>;
}

interface RecipeIngredientInput {
  id: string;
  name: string;
  isAllergen: boolean;
  quantity?: number;
  unit?: string;
}

export default function RecipeForm({ recipe, ingredients, onSubmit }: RecipeFormProps) {
  const [formData, setFormData] = useState({
    name: recipe?.name ?? '',
    description: recipe?.description ?? '',
    preparationTime: recipe?.preparationTime?.toString() ?? '',
    ageRangeStart: recipe?.ageRangeStart?.toString() ?? '',
    ageRangeEnd: recipe?.ageRangeEnd?.toString() ?? '',
    instructions: recipe?.instructions ?? '',
    selectedIngredients: recipe?.recipeIngredients?.map(ri => ({
      id: ri.ingredient.id,
      name: ri.ingredient.name,
      isAllergen: ri.ingredient.isAllergen,
      quantity: ri.quantity,
      unit: ri.unit
    })) ?? []
  });

  const handleIngredientChange = (_: any, values: Ingredient[]) => {
    setFormData(prev => ({
      ...prev,
      selectedIngredients: values.map(ing => ({
        id: ing.id,
        name: ing.name,
        isAllergen: ing.isAllergen,
        quantity: undefined,
        unit: undefined
      }))
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      name: formData.name,
      description: formData.description,
      preparationTime: formData.preparationTime ? Number(formData.preparationTime) : undefined,
      ageRangeStart: formData.ageRangeStart ? Number(formData.ageRangeStart) : undefined,
      ageRangeEnd: formData.ageRangeEnd ? Number(formData.ageRangeEnd) : undefined,
      instructions: formData.instructions,
      recipeIngredients: formData.selectedIngredients.map(ing => ({
        ingredientId: ing.id,
        ingredient: ingredients.find(i => i.id === ing.id)!,
        quantity: ing.quantity,
        unit: ing.unit
      }))
    };
    await onSubmit(submissionData);
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 } }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            required
            label="Recipe Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            multiline
            rows={2}
            fullWidth
          />

          <TextField
            label="Preparation Time (minutes)"
            type="number"
            value={formData.preparationTime}
            onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
            fullWidth
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Age Range Start (months)"
              type="number"
              value={formData.ageRangeStart}
              onChange={(e) => setFormData({ ...formData, ageRangeStart: e.target.value })}
              fullWidth
            />

            <TextField
              label="Age Range End (months)"
              type="number"
              value={formData.ageRangeEnd}
              onChange={(e) => setFormData({ ...formData, ageRangeEnd: e.target.value })}
              fullWidth
            />
          </Stack>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Ingredients
            </Typography>
            <Autocomplete
              multiple
              options={ingredients}
              getOptionLabel={(option) => option.name}
              value={ingredients.filter(ing => 
                formData.selectedIngredients.some(selected => selected.id === ing.id)
              )}
              onChange={handleIngredientChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    color={option.isAllergen ? "warning" : "default"}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Add ingredients"
                />
              )}
            />
          </Box>

          <TextField
            label="Instructions"
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            multiline
            rows={4}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            {recipe ? 'Update' : 'Create'} Recipe
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}