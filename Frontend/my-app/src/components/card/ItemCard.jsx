import React from 'react';
import { Box, Image, Text, VStack, Badge } from '@chakra-ui/react';

const ItemCard = ({ item = {} }) => {
  const {
    image = 'https://via.placeholder.com/300', // Use a placeholder for default
    description = 'No description available',
    customerName = 'Unknown customer',
    itemName = 'Unnamed item',
    sold = false
  } = item;

  const badgeColor = sold ? 'green' : 'red';
  const badgeText = sold ? 'Sold' : 'Available';

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
        src={image}
        alt={itemName}
        boxSize="100%"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/300" // Ensure fallback URL is valid
      />
      <VStack align="start" spacing={2} mt={4}>
        <Text fontWeight="bold" fontSize="lg">{itemName}</Text>
        <Text color="gray.600">{description}</Text>
        <Text color="gray.500">Customer: {customerName}</Text>
        <Badge colorScheme={badgeColor}>{badgeText}</Badge>
      </VStack>
    </Box>
  );
};

export default ItemCard;
