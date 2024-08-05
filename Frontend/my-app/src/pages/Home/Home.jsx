import React, { useState, useEffect } from 'react';
import ItemCard from '../../components/card/ItemCard';
import { Box, Spinner } from '@chakra-ui/react';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch('https://capitall-5.onrender.com/api/items')
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
    <div>
      {items.length > 0 ? (
        items.map(item => (
          <ItemCard
            key={item.id} // Ensure `item.id` is unique
            item={item}
          />
        ))
      ) : (
        <Box textAlign="center" mt={4}>No items available</Box>
      )}
    </div>
  );
};

export default HomePage;
