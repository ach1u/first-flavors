import { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Add as AddIcon,
} from '@mui/icons-material';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns';
import type { Recipe } from '@/types';

interface MealPlan {
  id: string;
  recipe: Recipe;
  plannedDate: Date;
  notes?: string;
}

interface MealPlanCalendarProps {
  mealPlans: MealPlan[];
  onAddMeal: (date: Date) => void;
}

export default function MealPlanCalendar({ mealPlans, onAddMeal }: MealPlanCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getMealsForDate = (date: Date) => 
    mealPlans.filter(plan => 
      format(new Date(plan.plannedDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

  return (
    <Paper sx={{ p: 3 }}>
      {/* Calendar Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <IconButton onClick={goToPreviousMonth}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h5">
          {format(currentDate, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={goToNextMonth}>
          <ChevronRight />
        </IconButton>
      </Stack>

      {/* Calendar Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
        {/* Day Labels */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Box key={day}>
            <Typography align="center" sx={{ fontWeight: 'bold' }}>
              {day}
            </Typography>
          </Box>
        ))}

        {/* Calendar Days */}
        {daysInMonth.map((day) => {
          const dayMeals = getMealsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <Paper
              key={day.toString()}
              sx={{
                p: 1,
                height: 120,
                bgcolor: !isCurrentMonth ? 'grey.100' :
                         isToday(day) ? 'primary.light' : 'background.paper',
                display: 'flex',
                flexDirection: 'column',
              }}
              elevation={isToday(day) ? 3 : 1}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                  color={!isCurrentMonth ? 'text.disabled' : 'inherit'}
                >
                  {format(day, 'd')}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => onAddMeal(day)}
                  sx={{ visibility: isCurrentMonth ? 'visible' : 'hidden' }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ overflow: 'auto', flex: 1 }}>
                {dayMeals.map((meal) => (
                  <Typography
                    key={meal.id}
                    variant="caption"
                    component="div"
                    noWrap
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      p: 0.5,
                      borderRadius: 1,
                      mb: 0.5,
                    }}
                  >
                    {meal.recipe.name}
                  </Typography>
                ))}
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Paper>
  );
}