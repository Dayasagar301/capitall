import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Flex, HStack, Link, Button } from '@chakra-ui/react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to verify the token here
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove token and update authentication state
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box color="white" fontWeight="bold">Capitall</Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/" color="white">Home</Link>
            {isAuthenticated && (
              <>
                <Link as={RouterLink} to="/sell" color="white">Sell Item</Link>
                <Link as={RouterLink} to="/unsold" color="white">Unsold Items</Link>
                <Link as={RouterLink} to="/myitems" color="white">My Items</Link>
              </>
            )}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          {isAuthenticated ? (
            <Button variant="solid" colorScheme="teal" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link as={RouterLink} to="/login" color="white" mx={2}>Login</Link>
              <Link as={RouterLink} to="/register" color="white" mx={2}>Register</Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
