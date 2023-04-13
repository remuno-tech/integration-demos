import React from 'react';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';

const Callbacks = () => {
  return (
    <>
      <Text as='b'>Callbacks (check types for more details)</Text>
      <Box w='100%'>
        <UnorderedList>
          <ListItem>
            onTransactionCompleted: (data: ApiTxn) ={'>'} void;
          </ListItem>
          <ListItem>onTransactionExpired: (data: ApiTxn) ={'>'} void;</ListItem>
          <ListItem>onTransactionCreated: (data: ApiTxn) ={'>'} void;</ListItem>
          <ListItem>
            onTransactionFailed: (error?: string) ={'>'} void;
          </ListItem>
          <ListItem>
            onTransactionCancelled: (data: ApiTxn) ={'>'} void;
          </ListItem>
          <ListItem>onQuoteUpdated: (data: ApiQuote) ={'>'} void;</ListItem>
          <ListItem>onOpen: () ={'>'} void;</ListItem>
          <ListItem>onClose: () ={'>'} void;</ListItem>
        </UnorderedList>
      </Box>
    </>
  );
};

export default Callbacks;
