import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the context

const SellItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the user from the context

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      console.log(files[0])
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
   
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('https://capitall-5.onrender.com/api/items', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`, // Add the authorization header
        },
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Item created.",
          description: "Your item has been listed for sale.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
      } else {
        toast({
          title: "Error",
          description: result.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
      backgroundImage={"https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
    >
      <Box
        w="full"
        maxW="md"
        bg="white"
        p={6}
        boxShadow="lg"
        borderRadius="md"
      >
        <Heading mb={6} textAlign="center">
          Sell an Item
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="price" isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="image">
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Sell Item
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SellItem;
