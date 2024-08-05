import React, { useState, useEffect } from 'react';
import ItemCard from '../../components/card/ItemCard';
import { Box, Spinner, SimpleGrid } from '@chakra-ui/react';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return <Box color="red.500" textAlign="center">Error fetching items: {error.message}</Box>;
  }

  return (
    <Box p={4}>
      {items.length > 0 ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {items.map(item => (
            <ItemCard
              key={item._id} // Ensure `item.id` is unique
              item={item}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Box textAlign="center" mt={4}>No items available</Box>
      )}
    </Box>
  );
};

export default HomePage;
