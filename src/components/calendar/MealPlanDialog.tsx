import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  Stack,
} from '@mui/material';
import { format } from 'date-fns';
import type { Recipe } from '@/types';

interface MealPlanDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { recipeId: string; notes?: string }) => Promise<void>;
  selectedDate: Date;
  recipes: Recipe[];
}

export default function MealPlanDialog({
  open,
  onClose,
  onSave,
  selectedDate,
  recipes,
}: MealPlanDialogProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    if (selectedRecipe) {
      await onSave({
        recipeId: selectedRecipe.id,
        notes: notes.trim() || undefined,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedRecipe(null);
    setNotes('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add Meal for {format(selectedDate, 'MMMM d, yyyy')}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Autocomplete
            options={recipes}
            getOptionLabel={(option) => option.name}
            value={selectedRecipe}
            onChange={(_, newValue) => setSelectedRecipe(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Recipe"
                required
              />
            )}
          />
          <TextField
            label="Notes"
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!selectedRecipe}
        >
          Add to Calendar
        </Button>
      </DialogActions>
    </Dialog>
  );
}