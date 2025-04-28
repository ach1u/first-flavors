import { useState } from 'react';
import {
  Paper,
  Typography,
  IconButton,
  Box,
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
    <Paper sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Calendar Header */}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
        mb={3}
        sx={{ 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}
      >
        <IconButton onClick={goToPreviousMonth}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          {format(currentDate, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={goToNextMonth}>
          <ChevronRight />
        </IconButton>
      </Stack>

      {/* Calendar Grid */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: { xs: 0.5, sm: 1 },
        mx: { xs: -1, sm: 0 }
      }}>
        {/* Day Labels */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Box 
            key={day} 
            sx={{ 
              width: { 
                xs: 'calc((100% - 6 * 4px) / 7)',
                sm: 'calc((100% - 6 * 8px) / 7)'
              }
            }}
          >
            <Typography 
              align="center" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              {day}
            </Typography>
          </Box>
        ))}

        {/* Calendar Days */}
        {daysInMonth.map((day) => {
          const dayMeals = getMealsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <Box 
              key={day.toString()} 
              sx={{ 
                width: { 
                  xs: 'calc((100% - 6 * 4px) / 7)',
                  sm: 'calc((100% - 6 * 8px) / 7)'
                }
              }}
            >
              <Paper
                sx={{
                  p: { xs: 0.5, sm: 1 },
                  height: { xs: 100, sm: 120 },
                  bgcolor: !isCurrentMonth ? 'grey.100' :
                           isToday(day) ? 'primary.light' : 'background.paper',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
                elevation={isToday(day) ? 3 : 1}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography
                    color={!isCurrentMonth ? 'text.disabled' : 'inherit'}
                    sx={{ fontSize: 'inherit' }}
                  >
                    {format(day, 'd')}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => onAddMeal(day)}
                    sx={{ 
                      visibility: isCurrentMonth ? 'visible' : 'hidden',
                      padding: { xs: '2px', sm: '4px' }
                    }}
                  >
                    <AddIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
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
                        p: { xs: '2px 4px', sm: '4px 8px' },
                        borderRadius: 1,
                        mb: 0.5,
                        fontSize: { xs: '0.625rem', sm: '0.75rem' }
                      }}
                    >
                      {meal.recipe.name}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}