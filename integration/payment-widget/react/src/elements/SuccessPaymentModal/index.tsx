import React from 'react';

import { useFormContext } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
} from '@chakra-ui/react';

import { ApiTxn } from '../../types/api.types';

interface IModalProps {
  isOpen: boolean;
  onClose(): void;
  txn?: ApiTxn;
}

const SuccessPaymentModal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  txn,
}) => {
  const { watch } = useFormContext();
  const merchantName = watch('markup.merchantName');

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        sx={{
          padding: '30px 0',
          margin: '0 10px',
        }}
      >
        <ModalCloseButton
          sx={{
            _focus: {
              boxShadow: 'none',
            },
          }}
        />
        <ModalBody>
          <Flex alignItems='center' direction='column' gap='10px' mt='10px'>
            <Text fontWeight='bold' textAlign='center'>
              Thank you for purchasing from {merchantName}
            </Text>
            <Text fontWeight='bold' textAlign='center'>
              Your transaction ID is: {txn?.id}
            </Text>
            <Text fontWeight='bold' textAlign='center'>
              Your order number is: {txn?.orderId}
            </Text>
            <Text fontWeight='bold' textAlign='center'>
              We will email you when your goods are dispatched
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default SuccessPaymentModal;
