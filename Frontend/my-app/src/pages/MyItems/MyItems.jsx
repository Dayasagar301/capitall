import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Select, Textarea, useDisclosure } from '@chakra-ui/react';
import ItemCard from '../../components/card/ItemCard';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [unsoldItems, setUnsoldItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items/myitems', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
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
      }
    };

    fetchUserItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setUnsoldItems(unsoldItems.filter(item => item._id !== itemId));
      setItems(items.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch(`https://capitall-5.onrender.com/api/items/${selectedItem._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const updatedItem = await response.json();
      setItems(items.map(item => item._id === updatedItem._id ? updatedItem : item));
      setUnsoldItems(unsoldItems.map(item => item._id === updatedItem._id ? updatedItem : item));
      setSelectedItem(null);
      onClose();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="xl" mb={5}>My Items</Heading>
      <Heading as="h3" size="lg" mb={3}>Unsold Items</Heading>
      <VStack spacing={4} align="stretch">
        {unsoldItems.map(item => (
          <Box key={item._id} position="relative">
            <ItemCard item={item} />
            <Button onClick={() => handleEdit(item)} colorScheme="blue" position="absolute" top={2} right={16}>Edit</Button>
            <Button onClick={() => handleDelete(item._id)} colorScheme="red" position="absolute" top={2} right={2}>Delete</Button>
          </Box>
        ))}
      </VStack>
      <Heading as="h3" size="lg" mt={5} mb={3}>Sold Items</Heading>
      <VStack spacing={4} align="stretch">
        {soldItems.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
      </VStack>

      {/* Edit Item Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdate}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input name="name" defaultValue={selectedItem?.name} />
              </FormControl>
              <FormControl id="price" mt={4} isRequired>
                <FormLabel>Price</FormLabel>
                <Input name="price" type="number" defaultValue={selectedItem?.price} />
              </FormControl>
              <FormControl id="status" mt={4} isRequired>
                <FormLabel>Status</FormLabel>
                <Select name="status" defaultValue={selectedItem?.status}>
                  <option value="unsold">Unsold</option>
                  <option value="sold">Sold</option>
                </Select>
              </FormControl>
              <FormControl id="description" mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" defaultValue={selectedItem?.description} />
              </FormControl>
              <FormControl id="image" mt={4}>
                <FormLabel>Image</FormLabel>
                <Input name="image" type="file" />
              </FormControl>
              <Button mt={4} colorScheme="teal" type="submit">Update Item</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyItems;
