import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../../components/card/ItemCard';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [unsoldItems, setUnsoldItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchUserItems = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://capitall-5.onrender.com/api/items/myitems', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const itemsData = await response.json();
        setItems(itemsData);
        setUnsoldItems(itemsData.filter(item => item.status === 'unsold'));
        setSoldItems(itemsData.filter(item => item.status === 'sold'));
      } catch (error) {
        console.error('Error fetching user items:', error);
        if (error.message.includes('401')) {
          toast({
            title: 'Unauthorized',
            description: 'Please log in to view your items.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          navigate('/login');
        }
      }
    };

    fetchUserItems();
  }, [navigate, toast]);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`https://capitall-5.onrender.com/api/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setUnsoldItems(unsoldItems.filter(item => item._id !== itemId));
      toast({
        title: 'Item deleted.',
        description: 'The item has been successfully deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: 'Error deleting item.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (item) => {
    navigate(`/updateform/${item._id}`);
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="xl" mb={5}>My Items</Heading>
      <Heading as="h3" size="lg" mb={3}>Unsold Items</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        {unsoldItems.map(item => (
          <Box key={item._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <ItemCard item={item} />
            <Box p={4} textAlign="center">
              <Button onClick={() => handleEdit(item)} colorScheme="blue" mr={2}>Edit</Button>
              <Button onClick={() => handleDelete(item._id)} colorScheme="red">Delete</Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Heading as="h3" size="lg" mt={5} mb={3}>Sold Items</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        {soldItems.map(item => (
          <Box key={item._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <ItemCard item={item} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MyItems;
