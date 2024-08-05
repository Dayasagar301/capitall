import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the useAuth hook to access login
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: "All fields are required.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        login(data); // Pass the response data to the login function
        toast({
          title: "Registration successful.",
          description: "You have successfully registered.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate('/login');
      } else {
        if (data.message === 'User already exists') {
          toast({
            title: "Registration failed.",
            description: "User already exists.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Registration failed.",
            description: data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to register. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error('Error:', error);
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
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
