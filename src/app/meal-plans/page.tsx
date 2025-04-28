'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import MealPlanCalendar from '@/components/calendar/MealPlanCalendar';
import MealPlanDialog from '@/components/calendar/MealPlanDialog';
import ShoppingList from '@/components/shopping/ShoppingList';
import { ShoppingCartOutlined as ShoppingCartIcon } from '@mui/icons-material';
import type { Recipe, MealPlan } from '@/types';

export default function MealPlansPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const fetchMealPlans = async () => {
    const currentDate = new Date();
    const start = format(startOfMonth(currentDate), 'yyyy-MM-dd');
    const end = format(endOfMonth(currentDate), 'yyyy-MM-dd');
    
    const response = await fetch(`/api/meal-plans?startDate=${start}&endDate=${end}`);
    if (response.ok) {
      const data = await response.json();
      setMealPlans(data);
    }
  };

  const fetchShoppingList = async () => {
    const currentDate = new Date();
    const start = format(startOfMonth(currentDate), 'yyyy-MM-dd');
    const end = format(endOfMonth(currentDate), 'yyyy-MM-dd');

    const response = await fetch(`/api/shopping-list?startDate=${start}&endDate=${end}`);
    if (response.ok) {
      const data = await response.json();
      setShoppingList(data);
      setShowShoppingList(true);
    }
  };

  const fetchRecipes = async () => {
    const response = await fetch('/api/recipes');
    if (response.ok) {
      const data = await response.json();
      setRecipes(data);
    }
  };

  const handleAddMeal = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSaveMeal = async (data: { recipeId: string; notes?: string }) => {
    if (!selectedDate) return;

    const response = await fetch('/api/meal-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        plannedDate: selectedDate,
      }),
    });

    if (response.ok) {
      const newMealPlan = await response.json();
      setMealPlans([...mealPlans, newMealPlan]);
      setSelectedDate(null);
    }
  };

  useEffect(() => {
    fetchMealPlans();
    fetchRecipes();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Meal Planning
        </Typography>
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={fetchShoppingList}
        >
          Generate Shopping List
        </Button>
      </Stack>

      {showShoppingList && (
        <Box mb={3}>
          <ShoppingList items={shoppingList} />
        </Box>
      )}

      <Box sx={{ mt: 3 }}>
        <MealPlanCalendar
          mealPlans={mealPlans}
          onAddMeal={handleAddMeal}
        />
      </Box>

      <MealPlanDialog
        open={!!selectedDate}
        onClose={() => setSelectedDate(null)}
        onSave={handleSaveMeal}
        selectedDate={selectedDate ?? new Date()}
        recipes={recipes}
      />
    </Container>
  );
}