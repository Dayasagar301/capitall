import React from 'react';
import { Box, Image, Text, VStack, Badge } from '@chakra-ui/react';

const ItemCard = ({ item = {} }) => {
  const {
    image = 'https://via.placeholder.com/300', // Use a placeholder for default
    description = 'No description available',
    user = 'Unknown user',
    name = 'Unnamed item',
    status = 'unsold'
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
      maxW="300px"
      minH="350px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Image
        src={image.startsWith('http') ? image : `http://localhost:5000/${image}`}
        alt={name}
        boxSize="100%"
        objectFit="cover"
        maxH="150px"
        fallbackSrc="https://via.placeholder.com/300"
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
