import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Timer as TimerIcon } from '@mui/icons-material';
import type { Recipe } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {recipe.name}
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {recipe.preparationTime && (
            <Chip
              icon={<TimerIcon />}
              label={`${recipe.preparationTime} min`}
              size="small"
              color="primary"
            />
          )}
          {recipe.ageRangeStart && recipe.ageRangeEnd && (
            <Chip
              label={`${recipe.ageRangeStart}-${recipe.ageRangeEnd} months`}
              size="small"
              color="secondary"
            />
          )}
        </Stack>

        {recipe.description && (
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {recipe.description}
          </Typography>
        )}

        <Typography variant="subtitle2" gutterBottom>
          Ingredients:
        </Typography>
        <List dense>
          {recipe.recipeIngredients.map(({ ingredient, quantity, unit }) => (
            <ListItem key={ingredient.id} sx={{ py: 0 }}>
              <ListItemText>
                {quantity && unit
                  ? `${quantity} ${unit} ${ingredient.name}`
                  : ingredient.name}
                {ingredient.isAllergen && (
                  <Chip
                    label="Allergen"
                    color="warning"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                )}
              </ListItemText>
            </ListItem>
          ))}
        </List>

        {recipe.instructions && (
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              Instructions:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {recipe.instructions}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}