import React, { useState, useEffect } from 'react';
import ItemCard from '../../components/card/ItemCard';
import { Box, Button, Spinner, SimpleGrid, Flex } from '@chakra-ui/react';

const UnsoldItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/items?status=unsold')
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

  const handlePurchase = async (itemId) => {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    if (!token) {
      alert('You must be logged in to purchase an item.');
      return;
    }

    console.log('Token:', token);  // Debug: Check if token is being retrieved

    try {
      const response = await fetch(`https://capitall-5.onrender.com/api/items/purchase/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);  // Debug: Log error response from server
        throw new Error(errorData.msg || 'Failed to purchase item');
      }

      const updatedItem = await response.json();

      // Remove the purchased item from the list
      setItems(items.filter(item => item._id !== updatedItem._id));
    } catch (error) {
      console.error('Error:', error);  // Debug: Log error
      setError(error);
    }
  };

  if (loading) {
    return <Box textAlign="center" mt={4}><Spinner size="lg" /></Box>;
  }

  if (error) {
    return <Box color="red.500" textAlign="center">Error fetching items: {error.message}</Box>;
  }

  return (
    <Box>
      {items.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mb={4}>
          {items.map(item => (
            <Flex
              key={item._id}
              direction="column"
              align="center"
              p={4}
              borderWidth={1}
              borderRadius="md"
              shadow="md"
            >
              <ItemCard item={item} />
              <Button
                colorScheme="blue"
                mt={4}
                onClick={() => handlePurchase(item._id)}
              >
                Purchase
              </Button>
            </Flex>
          ))}
        </SimpleGrid>
      ) : (
        <Box textAlign="center" mt={4}>No unsold items available</Box>
      )}
    </Box>
  );
};

export default UnsoldItems;
