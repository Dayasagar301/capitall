// src/components/Navbar.jsx
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Flex, HStack, Link, Button, useDisclosure } from '@chakra-ui/react';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists in local storage

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box color="white" fontWeight="bold">Capitall</Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/" color="white">Home</Link>
            {isLoggedIn && (
              <>
                <Link as={RouterLink} to="/sell" color="white">Sell Item</Link>
                <Link as={RouterLink} to="/unsold" color="white">Unsold Items</Link>
                <Link as={RouterLink} to="/myitems" color="white">My Items</Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link as={RouterLink} to="/login" color="white">Login</Link>
                <Link as={RouterLink} to="/register" color="white">Register</Link>
              </>
            )}
          </HStack>
        </HStack>
        {isLoggedIn && (
          <Flex alignItems="center">
            <Button variant="solid" colorScheme="teal" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
