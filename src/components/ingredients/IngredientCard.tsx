import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import type { Ingredient } from '@/types';

interface IngredientCardProps {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {ingredient.name}
          </Typography>
          {ingredient.isAllergen && (
            <Chip
              icon={<WarningIcon />}
              label="Allergen"
              color="warning"
              size="small"
            />
          )}
        </Box>
        {ingredient.dateIntroduced && (
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Introduced: {new Date(ingredient.dateIntroduced).toLocaleDateString()}
          </Typography>
        )}
        {ingredient.notes && (
          <Typography variant="body2">{ingredient.notes}</Typography>
        )}
      </CardContent>
    </Card>
  );
}