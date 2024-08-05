import React from 'react';
import { Box, Image, Text, VStack, Badge } from '@chakra-ui/react';

const ItemCard = ({ item = {} }) => {
  const {
    image = 'https://via.placeholder.com/300', // Use a placeholder for default
    description = 'No description available',
    user = 'Unknown user', // Changed to 'user' for consistency
    name = 'Unnamed item', // Changed to 'name' for consistency
    status = 'unsold' // Changed to 'status' for consistency
  } = item;

  const badgeColor = status === 'sold' ? 'green' : 'red';
  const badgeText = status === 'sold' ? 'Sold' : 'Available';

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="lg"
      p={4}
      bg="white"
      maxW={{ base: '100%', md: '300px' }}
    >
      <Image
        src={`http://localhost:5000/uploads/${image}`} // Ensure URL is correct
        alt={name}
        boxSize="100%"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/300" // Ensure fallback URL is valid
      />
      <VStack align="start" spacing={2} mt={4}>
        <Text fontWeight="bold" fontSize="lg">{name}</Text>
        <Text color="gray.600">{description}</Text>
        <Text color="gray.500">User: {user}</Text>
        <Badge colorScheme={badgeColor}>{badgeText}</Badge>
      </VStack>
    </Box>
  );
};

export default ItemCard;
