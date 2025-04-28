import { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  Rating,
  Typography,
  IconButton,
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

interface ReactionFormProps {
  recipeId: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ReactionForm({ recipeId, onSubmit, onCancel }: ReactionFormProps) {
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearPhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('recipeId', recipeId);
    formData.append('notes', notes);
    if (rating !== null) {
      formData.append('rating', rating.toString());
    }
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onSubmit();
      }
    } catch (error) {
      console.error('Failed to submit reaction:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box>
            <Typography component="legend">Rating</Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>

          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          <Box>
            <input
              ref={fileInputRef}
              accept="image/*"
              type="file"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
              id="photo-upload"
            />
            <label htmlFor="photo-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<PhotoCameraIcon />}
              >
                Add Photo
              </Button>
            </label>

            {photoPreview && (
              <Box mt={2} position="relative" display="inline-block">
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    objectFit: 'contain',
                  }}
                />
                <IconButton
                  size="small"
                  onClick={handleClearPhoto}
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    bgcolor: 'background.paper',
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit Reaction
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}