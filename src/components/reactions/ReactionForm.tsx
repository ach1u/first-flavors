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
  CircularProgress,
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { uploadImage } from '@/lib/upload';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    try {
      let photoUrl: string | undefined;
      if (photo) {
        photoUrl = await uploadImage(photo);
      }

      const formData = new FormData();
      formData.append('recipeId', recipeId);
      formData.append('notes', notes);
      if (rating !== null) {
        formData.append('rating', rating.toString());
      }
      if (photoUrl) {
        formData.append('photoUrl', photoUrl);
      }

      const response = await fetch('/api/reactions', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit reaction');
      }

      onSubmit();
    } catch (error) {
      console.error('Failed to submit reaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 } }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box>
            <Typography component="legend" sx={{ mb: 1 }}>Rating</Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' }
              }}
            />
          </Box>

          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={3}
            fullWidth
            disabled={isSubmitting}
          />

          <Box>
            <input
              ref={fileInputRef}
              accept="image/*"
              type="file"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
              id="photo-upload"
              disabled={isSubmitting}
            />
            <Stack spacing={2} alignItems="flex-start">
              <label htmlFor="photo-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCameraIcon />}
                  fullWidth
                  sx={{ mb: 1 }}
                  disabled={isSubmitting}
                >
                  {photo ? 'Change Photo' : 'Add Photo'}
                </Button>
              </label>

              {photoPreview && (
                <Box 
                  position="relative" 
                  width="100%" 
                  sx={{
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    borderRadius: 1,
                    bgcolor: 'grey.100'
                  }}
                >
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={handleClearPhoto}
                    disabled={isSubmitting}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': {
                        bgcolor: 'background.paper',
                      }
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Box>
              )}
            </Stack>
          </Box>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            sx={{ pt: 2 }}
          >
            <Button 
              onClick={onCancel}
              fullWidth
              variant="outlined"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Submitting...
                </>
              ) : (
                'Submit Reaction'
              )}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}