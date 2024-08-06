import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, Textarea, useToast } from '@chakra-ui/react';

const UpdateForm = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (itemId) {
        const fetchItem = async () => {
            try {
              const token = JSON.parse(localStorage.getItem('token'));
              console.log('Retrieved Token:', token); // Log the token
              const response = await fetch(`http://localhost:5000/api/items/${itemId}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
              }
              const itemData = await response.json();
              setItem(itemData);
            } catch (error) {
              console.error('Error fetching item:', error);
              toast({
                title: 'Error fetching item.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            }
          };
          
      fetchItem();
    }
  }, [itemId, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        throw new Error('No authentication token found.');
      }
      const response = await fetch(`http://localhost:5000/api/items/${itemId || ''}`, {
        method: itemId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
      }

      const message = itemId ? 'Item updated successfully!' : 'Item created successfully!';
      toast({
        title: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/myitems');
    } catch (error) {
      console.error('Error submitting item:', error);
      toast({
        title: 'Error submitting item.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" p={5} onSubmit={handleSubmit}>
      <FormControl id="name" mb={5}>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Enter item name"
          required
        />
      </FormControl>
      <FormControl id="price" mb={5}>
        <FormLabel>Price</FormLabel>
        <Input
          name="price"
          type="number"
          value={item.price}
          onChange={handleChange}
          placeholder="Enter item price"
          required
        />
      </FormControl>
      <FormControl id="description" mb={5}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Enter item description"
          required
        />
      </FormControl>
      <FormControl id="image" mb={5}>
        <FormLabel>Image URL</FormLabel>
        <Input
          name="image"
          value={item.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          required
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        {itemId ? 'Update Item' : 'Create Item'}
      </Button>
    </Box>
  );
};

export default UpdateForm;
