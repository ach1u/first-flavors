'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Stack, Divider } from '@mui/material';
import RecipeCard from '@/components/recipes/RecipeCard';
import ReactionForm from '@/components/reactions/ReactionForm';
import ReactionCard from '@/components/reactions/ReactionCard';
import type { Recipe } from '@/types';

interface Reaction {
  id: string;
  recipeId: string;
  reactionDate: Date;
  notes?: string;
  rating?: number;
  photoUrl?: string;
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [showReactionForm, setShowReactionForm] = useState(false);

  const fetchRecipe = async () => {
    const response = await fetch(`/api/recipes/${params.id}`);
    if (response.ok) {
      const data = await response.json();
      setRecipe(data);
    }
  };

  const fetchReactions = async () => {
    const response = await fetch(`/api/reactions?recipeId=${params.id}`);
    if (response.ok) {
      const data = await response.json();
      setReactions(data);
    }
  };

  useEffect(() => {
    fetchRecipe();
    fetchReactions();
  }, [params.id]);

  const handleReactionSubmit = async () => {
    await fetchReactions();
    setShowReactionForm(false);
  };

  if (!recipe) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <RecipeCard recipe={recipe} />
        
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h5">Reactions</Typography>
            {!showReactionForm && (
              <Button 
                variant="contained" 
                onClick={() => setShowReactionForm(true)}
              >
                Add Reaction
              </Button>
            )}
          </Stack>

          {showReactionForm && (
            <Box mb={3}>
              <ReactionForm
                recipeId={recipe.id}
                onSubmit={handleReactionSubmit}
                onCancel={() => setShowReactionForm(false)}
              />
            </Box>
          )}

          <Stack spacing={2}>
            {reactions.map((reaction) => (
              <ReactionCard key={reaction.id} reaction={reaction} />
            ))}
            {reactions.length === 0 && !showReactionForm && (
              <Typography color="text.secondary" align="center">
                No reactions yet. Be the first to add one!
              </Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}