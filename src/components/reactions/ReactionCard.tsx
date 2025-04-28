import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Rating,
} from '@mui/material';
import { format } from 'date-fns';

interface ReactionProps {
  reaction: {
    id: string;
    reactionDate: Date;
    notes?: string;
    rating?: number;
    photoUrl?: string;
  };
}

export default function ReactionCard({ reaction }: ReactionProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2" color="text.secondary">
              {format(new Date(reaction.reactionDate), 'MMMM d, yyyy')}
            </Typography>
            {reaction.rating && (
              <Rating value={reaction.rating} readOnly size="small" />
            )}
          </Stack>

          {reaction.notes && (
            <Typography variant="body2">{reaction.notes}</Typography>
          )}

          {reaction.photoUrl && (
            <Box
              component="img"
              src={reaction.photoUrl}
              alt="Reaction photo"
              sx={{
                maxWidth: '100%',
                maxHeight: 200,
                objectFit: 'contain',
                borderRadius: 1,
              }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}