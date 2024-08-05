import React, { useState, useEffect } from 'react';
import { Box, Image, Text, VStack, Badge, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const ItemCard = ({ item = {} }) => {
  const {
    image = 'https://via.placeholder.com/300',
    description = 'No description available',
    user = {},
    name = 'Unnamed item',
    status = 'unsold'
  } = item;

  const [username, setUsername] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const badgeColor = status === 'sold' ? 'green' : 'red';
  const badgeText = status === 'sold' ? 'Sold' : 'Available';

  useEffect(() => {
    const fetchUser = async () => {
      if (!user._id) {
        console.warn('Invalid user ID:', user._id);
        return;
      }

      try {
        const response = await axios.get("https://capitall-5.onrender.com/api/items");
        console.log(response.data);

        // Find the item with the matching user ID
        const matchedItem = response.data.find(item => item.user._id === user._id);
        
        if (matchedItem) {
          setUsername(matchedItem.user.username);
        } else {
          setUsername('Unknown user');
        }

      } catch (error) {
        console.error('Error fetching user:', error);
        setUsername('Unknown user');
      }
    };

    fetchUser();
  }, [user._id]);

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
      {!imageLoaded && (
        <Box display="flex" justifyContent="center" alignItems="center" minH="150px">
          <Spinner size="xl" />
          <Text ml={4}>Loading image...</Text>
        </Box>
      )}
      <Image
        src={image.startsWith('http') ? image : `https://capitall-5.onrender.com/${image}`}
        alt={name}
        boxSize="100%"
        objectFit="cover"
        maxH="150px"
        fallbackSrc="https://via.placeholder.com/300"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)} // Set imageLoaded to true on error to hide spinner
        display={imageLoaded ? 'block' : 'none'}
      />
      
      <VStack align="start" spacing={2} mt={4}>
        <Text fontWeight="bold" fontSize="lg">{name}</Text>
        <Text color="gray.600">{description}</Text>
        <Text color="gray.500">User: {username}</Text>
        <Badge colorScheme={badgeColor}>{badgeText}</Badge>
      </VStack>
    </Box>
  );
};
// 
export default ItemCard;
