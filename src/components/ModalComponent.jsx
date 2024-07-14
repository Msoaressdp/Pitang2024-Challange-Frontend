import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useModal } from '../context/ModalContext';

const SubmissionModal = () => {
  const { isOpen, closeModal, message } = useModal();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeModal();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, closeModal]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agendamento</ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={closeModal}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubmissionModal;