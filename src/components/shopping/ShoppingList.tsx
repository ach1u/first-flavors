import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Chip,
  Divider,
} from '@mui/material';

interface ShoppingListProps {
  items: Array<{
    ingredient: { name: string; isAllergen: boolean };
    quantity?: number;
    unit?: string;
  }>;
}

export default function ShoppingList({ items }: ShoppingListProps) {
  return (
    <Paper sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
        Shopping List
      </Typography>
      
      <List sx={{ width: '100%' }}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 1 },
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 0.5, sm: 0 }
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography 
                    component="span" 
                    sx={{ 
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      fontWeight: 500 
                    }}
                  >
                    {item.ingredient.name}
                  </Typography>
                  {item.ingredient.isAllergen && (
                    <Chip
                      label="Allergen"
                      color="warning"
                      size="small"
                      sx={{ height: { xs: 20, sm: 24 } }}
                    />
                  )}
                </Box>
              }
              secondary={
                item.quantity && item.unit ? (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                  >
                    {`${item.quantity} ${item.unit}`}
                  </Typography>
                ) : null
              }
              sx={{ m: 0 }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}