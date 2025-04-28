import { useState } from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Ingredient } from '@/types';

interface IngredientFormProps {
  ingredient?: Partial<Ingredient>;
  onSubmit: (ingredient: Partial<Ingredient>) => Promise<void>;
}

export default function IngredientForm({ ingredient, onSubmit }: IngredientFormProps) {
  const [formData, setFormData] = useState({
    name: ingredient?.name ?? '',
    dateIntroduced: ingredient?.dateIntroduced ?? undefined,
    isAllergen: ingredient?.isAllergen ?? false,
    notes: ingredient?.notes ?? '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      dateIntroduced: formData.dateIntroduced || undefined
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            required
            label="Ingredient Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />

          <DatePicker
            label="Date Introduced"
            value={formData.dateIntroduced}
            onChange={(date) => setFormData({ ...formData, dateIntroduced: date || undefined })}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.isAllergen}
                onChange={(e) => setFormData({ ...formData, isAllergen: e.target.checked })}
              />
            }
            label="Potential Allergen"
          />

          <TextField
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            multiline
            rows={4}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            {ingredient ? 'Update' : 'Add'} Ingredient
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}