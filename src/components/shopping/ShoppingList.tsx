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

interface QuantityInfo {
  quantity: number;
  unit: string;
  recipe: string;
}

interface ShoppingListItem {
  id: string;
  name: string;
  isAllergen: boolean;
  quantities: QuantityInfo[];
}

interface ShoppingListProps {
  items: ShoppingListItem[];
}

export default function ShoppingList({ items }: ShoppingListProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Shopping List
      </Typography>
      <List>
        {items.map((item, index) => (
          <Box key={item.id}>
            {index > 0 && <Divider />}
            <ListItem>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography>{item.name}</Typography>
                    {item.isAllergen && (
                      <Chip
                        label="Allergen"
                        color="warning"
                        size="small"
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    {item.quantities.map((q, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        color="text.secondary"
                        component="div"
                      >
                        • {q.quantity} {q.unit} ({q.recipe})
                      </Typography>
                    ))}
                  </Box>
                }
              />
            </ListItem>
          </Box>
        ))}
      </List>
    </Paper>
  );
}